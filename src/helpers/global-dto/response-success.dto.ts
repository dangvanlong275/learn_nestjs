import { HttpStatus } from '@nestjs/common';

export class ResponseSuccessDTO<T> {
  readonly data: T;
  readonly status: number;

  constructor(data: T, status: number = HttpStatus.OK) {
    this.data = data;
    this.status = status;
  }
}
