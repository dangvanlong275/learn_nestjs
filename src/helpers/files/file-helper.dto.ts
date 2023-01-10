import * as fs from 'fs';
import { isset } from '../global-function/global-function';

export const removeFiles = (files: Express.Multer.File[] | any) => {
  if (files) {
    files.forEach((file) => {
      if (isset(file?.path)) {
        fs.unlink(file.path, (err) => {
          if (err) {
            return err;
          }
        });
      }
    });
  }
};

export const removeFile = (file: Express.Multer.File) => {
  if (isset(file?.path)) {
    fs.unlink(file.path, (err) => {
      if (err) {
        return err;
      }
    });
  }
};
