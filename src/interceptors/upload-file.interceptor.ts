import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  BadRequestException,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

const validFileExtensions = ['png', 'jpg', 'jpeg'];
const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

interface LocalFilesInterceptorOptions {
  typeUpload: 'single' | 'multiple';
  fieldName: string;
  path?: string;
  limits?: MulterOptions['limits'];
}

export const LocalFilesInterceptor = (
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> => {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination = process.env.PATH_UPLOAD;

      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: destination,
          filename: (req, file, cb) => {
            const fileExtension: string = path.extname(file.originalname);
            const fileName: string = uuidv4() + fileExtension;

            cb(null, fileName);
          },
        }),
        fileFilter: (req, file, callback) => {
          const fileExtension: string = path
            .extname(file.originalname)
            .substring(1);

          let cb = callback(null, true);
          cb = filterMimeType(file.mimetype, callback);
          cb = filterFileExtensions(fileExtension, callback);

          return cb;
        },
        limits: {
          fileSize: Math.pow(1024, 2), // 1MB
        },
      };

      if (options.typeUpload === 'single')
        this.fileInterceptor = new (FileInterceptor(
          options.fieldName,
          multerOptions,
        ))();
      else
        this.fileInterceptor = new (FilesInterceptor(
          options.fieldName,
          null,
          multerOptions,
        ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
};

export const filterMimeType = (fileMimeTypeOrigin, callback) => {
  const allowedMimeTypes = validMimeTypes;

  if (!allowedMimeTypes.includes(fileMimeTypeOrigin)) {
    return callback(new BadRequestException('Provide a valid image!'), false);
  }
};

export const filterFileExtensions = (fileExtensionOrigin, callback) => {
  const allowedFileExtensions = validFileExtensions;

  if (!allowedFileExtensions.includes(fileExtensionOrigin)) {
    return callback(
      new BadRequestException('File content does not match extension!'),
      false,
    );
  }
};
