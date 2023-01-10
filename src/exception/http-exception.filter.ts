import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { removeFile, removeFiles } from 'src/helpers/files/file-helper.dto';
import { isString } from 'src/helpers/global-function/global-function';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const resException = exception.getResponse();

    let message = resException;

    if (resException instanceof Object) {
      message = Object(resException).message;
      message = isString(message) ? message : message[0];
    }

    /**
     * Remove file if error
     */
    removeFile(request.file);
    removeFiles(request.files);

    response.status(status).json({
      status: false,
      error: HttpStatus[status],
      message: message,
    });
  }
}
