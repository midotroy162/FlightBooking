import { Table } from 'drizzle-orm';
import { db } from '../database';
import { IQueryBuilder } from '../interfaces/IQuery';
import { buildDrizzleReturningFields, DrizzleQueryAdapter } from '../helper/drizzleQueryAdapter';
import { IBaseModel } from '../interfaces';
import { QueryBuilder } from '../helper/queryBuilder';

export abstract class BaseModel<T extends Table> implements IBaseModel<T> {
  protected abstract table: T;

  async createMany(
    data: T['$inferInsert'][],
    returningFields: (keyof T['$inferSelect'])[] = [],
  ): Promise<T['$inferInsert'][]> {
    const query = db.insert(this.table).values(data);
    const result =
      returningFields.length > 0
        ? query.returning(buildDrizzleReturningFields(returningFields, this.table))
        : query.returning();
    return result;
  }

  async create(
    data: T['$inferInsert'],
    returningFields: (keyof T['$inferSelect'])[] = [],
  ): Promise<T['$inferSelect'] | null> {
    const result = await this.createMany([data], returningFields);
    if (result && result.length > 0) return result[0];
    return null;
  }

  async findByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'][]> {
    const drizzleAdapter = new DrizzleQueryAdapter<T>(filterQuery, this.table);
    return drizzleAdapter.buildSelectQuery();
  }

  async findOneByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'] | null> {
    filterQuery.limit(1);
    let result = await this.findByFilterQuery(filterQuery);
    if (result.length > 0) return result[0] ?? null;
    return null;
  }

  async findOneById(id: number): Promise<T['$inferSelect'] | null> {
    return this.findOneByFilterQuery(new QueryBuilder().where('id', '=', id));
  }

  async deleteByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'][]> {
    const drizzleAdapter = new DrizzleQueryAdapter<T>(filterQuery, this.table);
    return drizzleAdapter.buildDeleteQuery();
  }

  async deleteOneByFilterQuery(filterQuery: IQueryBuilder): Promise<T['$inferSelect'] | null> {
    let result = await this.deleteByFilterQuery(filterQuery);
    if (result.length > 0) return result[0] ?? null;
    return null;
  }

  async deleteById(id: number): Promise<void> {
    await this.deleteOneByFilterQuery(new QueryBuilder().where('id', '=', id));
  }

  async updateByFilterQuery(
    filterQuery: IQueryBuilder,
    data: T['$inferSelect'],
  ): Promise<T['$inferSelect'][]> {
    const drizzleAdapter = new DrizzleQueryAdapter<T>(filterQuery, this.table);
    return drizzleAdapter.buildUpdateQuery(data);
  }

  async updateOneByFilterQuery(
    filterQuery: IQueryBuilder,
    data: T['$inferSelect'],
  ): Promise<T['$inferSelect'] | null> {
    let result = await this.updateByFilterQuery(filterQuery, data);
    if (result.length > 0) return result[0] ?? null;
    return null;
  }

  async updateById(id: number, data: T['$inferSelect']): Promise<T['$inferSelect'] | null> {
    return this.updateOneByFilterQuery(new QueryBuilder().where('id', '=', id), data);
  }
}
