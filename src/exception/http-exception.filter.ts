import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { is_string } from 'src/helpers/global-function/global-function';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const resException = exception.getResponse();

    let message = resException;

    if (resException instanceof Object) {
      message = Object(resException).message;
      message = is_string(message) ? message : message[0];
    }

    response.status(status).json({
      status: false,
      error: HttpStatus[status],
      message: message,
    });
  }
}
