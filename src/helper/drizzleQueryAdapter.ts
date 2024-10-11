import {
  and,
  between,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  or,
  SQLWrapper,
  Table,
} from 'drizzle-orm';
import { db } from './../database';
import * as DrizzleSchema from './../schema';
import { IQueryBuilder, OrderByType, QueryObject, WhereCondition } from '../interfaces/IQuery';
import { IDrizzleQueryAdapter } from '../interfaces/IDrizzle';

export class DrizzleQueryAdapter<T extends Table> implements IDrizzleQueryAdapter<T> {
  private mainTable: T;
  private drizzleQuery: any;
  constructor(private queryBuilder: IQueryBuilder, private table: T) {
    this.mainTable = table;
  }

  private buildWhereClause(conditions: WhereCondition[]): any {
    return conditions.map((condition) => {
      if ('type' in condition) {
        const subConditions = this.buildWhereClause(condition.conditions);
        return condition.type == 'AND' ? and(...subConditions) : or(...subConditions);
      } else {
        const column = this.getColumn(condition.column);
        switch (condition.operator) {
          case '=':
            return eq(column, condition.value);
          case '!=':
            return not(eq(column, condition.value));
          case '>':
            return gt(column, condition.value);
          case '>=':
            return gte(column, condition.value);
          case '<':
            return lt(column, condition.value);
          case '<=':
            return lte(column, condition.value);
          case 'LIKE':
            return like(column, condition.value as SQLWrapper);
          case 'IN':
            return inArray(column, condition.value as SQLWrapper);
          case 'NOT IN':
            return not(inArray(column, condition.value as SQLWrapper));
          case 'BETWEEN':
            return between(
              column,
              (condition.value as unknown as SQLWrapper[])[0],
              (condition.value as unknown as SQLWrapper[])[1],
            );
          default:
            throw new Error(`Unsupported operator: ${condition.operator}`);
        }
      }
    });
  }

  private getColumn(columnName: string): any {
    if (columnName.includes('.')) {
      let [tableName, column] = columnName.split('.');
      const table = DrizzleSchema[tableName as keyof typeof DrizzleSchema];
      return table[column as unknown as keyof typeof table];
    }
    return this.mainTable[columnName as keyof T['$inferSelect']];
  }

  buildSelectQuery(): T['$inferSelect'][] {
    let query: QueryObject = this.queryBuilder.build();
    let fields = this.buildSelectColumns(query.select);
    this.drizzleQuery = db.select(fields).from(this.mainTable);
    return this.buildQuery(query);
  }

  buildDeleteQuery(): T['$inferSelect'][] {
    let query: QueryObject = this.queryBuilder.build();
    this.drizzleQuery = db.delete(this.mainTable);
    let drizzleQuery = this.buildQuery();
    return query.select.length > 0
      ? drizzleQuery.returning(this.buildReturningFields(query.select))
      : drizzleQuery.returning();
  }

  buildUpdateQuery(data: T['$inferSelect']): T['$inferSelect'][] {
    let query: QueryObject = this.queryBuilder.build();
    this.drizzleQuery = db.update(this.mainTable).set(data);
    let drizzleQuery = this.buildQuery(query);
    return query.select.length > 0
      ? drizzleQuery.returning(this.buildReturningFields(query.select))
      : drizzleQuery.returning();
  }

  buildCreateQuery(data: T['$inferInsert']): T['$inferInsert'][] {
    let query: QueryObject = this.queryBuilder.build();
    this.drizzleQuery = db.insert(this.mainTable).values(data);
    let drizzleQuery = this.buildQuery(query);
    return query.select.length > 0
      ? drizzleQuery.returning(this.buildReturningFields(query.select))
      : drizzleQuery.returning();
  }

  private buildQuery(query = this.queryBuilder.build()): any {
    if (query.where && query.where.length > 0) {
      this.drizzleQuery = this.drizzleQuery.where(and(...this.buildWhereClause(query.where)));
    }

    this.buildJoins(query);
    this.buildGroupByColumns(query);
    this.buildHavingClause(query);
    this.BuildOrderByColumns(query);
    this.buildLimit(query.limit ?? 0);
    this.buildOffset(query.offset ?? 0);

    return this.drizzleQuery;
  }

  private buildSelectColumns(selectColumns: string[]): any {
    if (selectColumns.length === 0) {
      return null;
    }
    let columns: any = {};
    for (const col of selectColumns) {
      columns[col] = this.getColumn(col);
    }
    return columns;
  }

  private buildReturningFields(returningFields: (keyof T['$inferSelect'])[]) {
    let fields = {} as T['$inferSelect'];
    for (const field of returningFields) {
      fields[field] = this.table[field];
    }
    return fields;
  }

  private buildJoins(query: QueryObject) {
    for (const join of query.joins) {
      if (typeof join.on.value !== 'string') {
        continue;
      }
      const joinTable = DrizzleSchema[join.table as keyof typeof DrizzleSchema];
      const [leftTable, leftColumn] = join.on.column.split('.');
      const joinCondition = eq(
        (this.mainTable as T['$inferSelect'])[leftColumn],
        joinTable[join.on.value?.split('.').pop() as unknown as keyof typeof joinTable],
      );

      switch (join.type) {
        case 'INNER':
          this.drizzleQuery = this.drizzleQuery.innerJoin(joinTable, joinCondition);
          break;
        case 'LEFT':
          this.drizzleQuery = this.drizzleQuery.leftJoin(joinTable, joinCondition);
          break;
        case 'RIGHT':
          this.drizzleQuery = db
            .select()
            .from(joinTable as any)
            .leftJoin(this.mainTable, joinCondition);
          break;
      }
    }
  }

  private buildGroupByColumns(query: QueryObject) {
    if (query.groupBy && query.groupBy.length > 0) {
      this.drizzleQuery = this.drizzleQuery.groupBy(
        ...query.groupBy.map((col) => this.getColumn(col)),
      );
    }
  }

  private buildHavingClause(query: QueryObject) {
    if (query.having && query.having.length > 0) {
      this.drizzleQuery = this.drizzleQuery.having(and(...this.buildWhereClause(query.having)));
    }
  }

  private BuildOrderByColumns(query: QueryObject) {
    if (query.orderBy && query.orderBy.length > 0) {
      this.drizzleQuery = this.drizzleQuery.orderBy(
        ...query.orderBy.map((order: OrderByType) => ({
          column: this.getColumn(order.column),
          direction: order.direction.toLowerCase(),
        })),
      );
    }
  }

  private buildLimit(value: number) {
    if (!value) {
      return;
    }
    this.drizzleQuery = this.drizzleQuery.limit(value);
  }

  private buildOffset(value: number) {
    if (!value) {
      return;
    }
    this.drizzleQuery = this.drizzleQuery.offset(value);
  }
}

export const buildDrizzleReturningFields = <T extends Table>(
  returningFields: (keyof T['$inferSelect'])[],
  table: T,
): T['$inferSelect'] => {
  let fields = {} as T['$inferSelect'];
  for (const field of returningFields) {
    fields[field] = table[field];
  }
  return fields;
};
