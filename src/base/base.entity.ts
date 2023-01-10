import { PageMetaDTO } from 'src/helpers/global-dto/page-meta.dto';
import { PageOptionsDTO } from 'src/helpers/global-dto/page-options.dto';
import {
  CreateDateColumn,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
export abstract class Model {
  withes: string[] = [];
  whereOptions: object = {};

  with = (relations: string[]): any => {
    this.withes = relations;
    return this;
  };

  where = (options: object): any => {
    this.whereOptions = options;
    return this;
  };

  countEntity = async (
    repository: Repository<ObjectLiteral>,
    options: object = {},
  ): Promise<number> => {
    return await repository.count(options ?? this.whereOptions);
  };

  pageMeta = async (
    repository: Repository<ObjectLiteral>,
    pageOptionsDTO: PageOptionsDTO,
  ): Promise<PageMetaDTO> => {
    const totalItem = await this.countEntity(repository);
    return new PageMetaDTO({ pageOptionsDTO, totalItem });
  };
}
