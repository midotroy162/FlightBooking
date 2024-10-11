import { SQLWrapper } from "drizzle-orm";

export interface IQueryBuilder {
   build(): QueryObject;
   where(column: string, operator: Operator, value: FilterValue): this;
   and(): IConditionBuilder;
   or(): IConditionBuilder;
   join(
      type: JoinType,
      table: string,
      onColumn: string,
      operator: Operator,
      value: FilterValue
   ): this;
   subQuery(query: IQueryBuilder, alias: string): this;
   groupBy(...columns: string[]): this;
   having(column: string, operator: Operator, value: FilterValue): this;
   andHaving(): IConditionBuilder;
   orHaving(): IConditionBuilder;
   orderBy(column: string, direction: "ASC" | "DESC"): this;
   select(...columns: string[]): this;
   limit(value: number): this;
   offset(value: number): this;
}

export interface IConditionBuilder {
   where(column: string, operator: Operator, value: FilterValue): this;
   and(): IConditionBuilder;
   or(): IConditionBuilder;
   end(): IQueryBuilder;
}

export interface Condition {
   column: string;
   operator: Operator;
   value: FilterValue;
}

export interface ComplexCondition {
   type: "AND" | "OR";
   conditions: (Condition | ComplexCondition)[];
}

export interface JoinClause {
   type: JoinType;
   table: string;
   on: Condition;
}

export interface SubQuery {
   query: IQueryBuilder;
   alias: string;
}

export interface QueryObject {
   table: string;
   select: string[];
   where: WhereCondition[];
   joins: JoinClause[];
   subQueries: SubQuery[];
   groupBy: string[];
   having: WhereCondition[];
   orderBy: OrderByType[];
   limit?: number;
   offset?: number;
}

export type Operator =
   | "="
   | "!="
   | ">"
   | "<"
   | ">="
   | "<="
   | "LIKE"
   | "IN"
   | "NOT IN"
   | "BETWEEN";

export type JoinType = "INNER" | "LEFT" | "RIGHT" | "FULL";

export type WhereCondition = Condition | ComplexCondition;

export type FilterValue =
   | string
   | number
   | boolean
   | string[]
   | number[]
   | Date
   | SQLWrapper;

export type OrderByType = { column: string; direction: "ASC" | "DESC" };
