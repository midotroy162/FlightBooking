import { Table } from 'drizzle-orm';
import { IQueryBuilder } from './IQuery';

export interface IBaseModel<T extends Table> {
  createMany(
    data: T['$inferInsert'][],
    returningFields: (keyof T['$inferSelect'])[],
  ): Promise<T['$inferInsert'][]>;
  create(
    data: T['$inferInsert'],
    returningFields?: (keyof T['$inferSelect'])[],
  ): Promise<T['$inferSelect'] | null>;
  findByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'][]>;
  findOneByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'] | null>;
  findOneById(id: number): Promise<T['$inferSelect'] | null>;
  deleteByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'][]>;
  deleteById(id: number): Promise<void>;
  deleteOneByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'] | null>;
  updateByFilterQuery(
    filterQuery: IQueryBuilder,
    data: T['$inferSelect'],
  ): Promise<T['$inferSelect'][]>;
  updateOneByFilterQuery(
    filterQuery: IQueryBuilder,
    data: T['$inferSelect'],
  ): Promise<T['$inferSelect'] | null>;
  updateById(id: number, data: T['$inferSelect']): Promise<T['$inferSelect'] | null>;
}
