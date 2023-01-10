export class ResponseSuccessDTO<T> {
  readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}
