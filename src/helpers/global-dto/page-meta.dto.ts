import { PageOptionsDTO } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDTO: PageOptionsDTO;
  totalItem: number;
}

export class PageMetaDTO {
  readonly page;
  readonly per_page;
  readonly total_item;
  readonly page_number;

  constructor({ pageOptionsDTO, totalItem }: PageMetaDtoParameters) {
    this.page = pageOptionsDTO.page;
    this.per_page = pageOptionsDTO.per_page;
    this.total_item = totalItem;
    this.page_number = Math.ceil(this.total_item / this.per_page);
  }
}
