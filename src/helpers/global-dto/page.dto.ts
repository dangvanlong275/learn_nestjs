import { PageMetaDTO } from './page-meta.dto';

export class PageDTO<T> {
  readonly data: T;

  readonly pagination: PageMetaDTO;

  constructor(data: T, pagination: PageMetaDTO) {
    this.data = data;
    this.pagination = pagination;
  }
}
