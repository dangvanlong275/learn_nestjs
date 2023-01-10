import { PageOptionsDTO } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDTO: PageOptionsDTO;
  itemCount: number;
}

export class PageMetaDTO {
  readonly page;
  readonly per_page;
  readonly item_count;
  readonly page_count;
  readonly has_previous_page;
  readonly has_next_page;

  constructor({ pageOptionsDTO, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDTO.page;
    this.per_page = pageOptionsDTO.per_page;
    this.item_count = itemCount;
    this.page_count = Math.ceil(this.item_count / this.per_page);
    this.has_previous_page = this.page > 1;
    this.has_next_page = this.page < this.page_count;
  }
}
