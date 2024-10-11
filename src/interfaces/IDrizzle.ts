import { Table } from 'drizzle-orm';

export interface IDrizzleQueryAdapter<T extends Table> {
  buildSelectQuery(): Partial<T['$inferSelect'][]>;
  buildDeleteQuery(): Partial<T['$inferSelect'][]>;
  buildUpdateQuery(data: T['$inferSelect']): Partial<T['$inferSelect'][]>;
  buildCreateQuery(data: T['$inferInsert']): Partial<T['$inferInsert'][]>;
}
