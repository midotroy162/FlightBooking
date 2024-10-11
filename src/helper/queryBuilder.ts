import {
  ComplexCondition,
  IConditionBuilder,
  IQueryBuilder,
  JoinClause,
  Operator,
  SubQuery,
  WhereCondition,
  JoinType,
  FilterValue,
  QueryObject,
} from '../interfaces/IQuery';

export class QueryBuilder implements IQueryBuilder {
  private selectColumns: string[] = [];
  private whereConditions: WhereCondition[] = [];
  private joinClauses: JoinClause[] = [];
  private subQueries: SubQuery[] = [];
  private groupByColumns: string[] = [];
  private havingConditions: WhereCondition[] = [];
  private orderByColumns: { column: string; direction: 'ASC' | 'DESC' }[] = [];
  private limitValue?: number;
  private offsetValue?: number;

  constructor(private tableName: string = '') {}

  select(...columns: string[]): this {
    this.selectColumns.push(...columns);
    return this;
  }

  where(column: string, operator: Operator, value: FilterValue): this {
    this.whereConditions.push({ column, operator, value });
    return this;
  }

  and(): IConditionBuilder {
    return new ConditionBuilder(this, 'AND', 'where');
  }

  or(): ConditionBuilder {
    return new ConditionBuilder(this, 'OR', 'where');
  }

  join(
    type: JoinType,
    table: string,
    onColumn: string,
    operator: Operator,
    value: FilterValue,
  ): this {
    this.joinClauses.push({
      type,
      table,
      on: { column: onColumn, operator, value },
    });
    return this;
  }

  subQuery(subQuery: IQueryBuilder, alias: string): this {
    this.subQueries.push({ query: subQuery, alias });
    return this;
  }

  groupBy(...columns: string[]): this {
    this.groupByColumns.push(...columns);
    return this;
  }

  having(column: string, operator: Operator, value: FilterValue): this {
    this.havingConditions.push({ column, operator, value });
    return this;
  }

  andHaving(): IConditionBuilder {
    return new ConditionBuilder(this, 'AND', 'having');
  }

  orHaving(): ConditionBuilder {
    return new ConditionBuilder(this, 'OR', 'having');
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByColumns.push({ column, direction });
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  offset(value: number): this {
    this.offsetValue = value;
    return this;
  }

  build(): QueryObject {
    return {
      table: this.tableName,
      select: this.selectColumns,
      where: this.whereConditions,
      joins: this.joinClauses,
      subQueries: this.subQueries,
      groupBy: this.groupByColumns,
      having: this.havingConditions,
      orderBy: this.orderByColumns,
      limit: this.limitValue,
      offset: this.offsetValue,
    };
  }
}

class ConditionBuilder implements IConditionBuilder {
  private conditions: WhereCondition[] = [];

  constructor(
    private parentBuilder: QueryBuilder,
    private type: 'AND' | 'OR',
    private conditionType: 'where' | 'having',
  ) {}

  where(column: string, operator: Operator, value: FilterValue): this {
    this.conditions.push({ column, operator, value });
    return this;
  }

  and(): IConditionBuilder {
    return new ConditionBuilder(this.parentBuilder, 'AND', this.conditionType);
  }

  or(): IConditionBuilder {
    return new ConditionBuilder(this.parentBuilder, 'OR', this.conditionType);
  }

  end(): IQueryBuilder {
    const complexCondition: ComplexCondition = {
      type: this.type,
      conditions: this.conditions,
    };
    if (this.conditionType === 'where') {
      this.parentBuilder['whereConditions'].push(complexCondition);
    } else {
      this.parentBuilder['havingConditions'].push(complexCondition);
    }
    return this.parentBuilder;
  }
}
