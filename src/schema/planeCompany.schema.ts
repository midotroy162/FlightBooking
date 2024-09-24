import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseModel } from './common';
import { relations } from 'drizzle-orm';
import { planes } from './plane.schema';

export const planeCompanies = pgTable('plane_companies', {
  ...baseModel,
  name: varchar('name', { length: 100 }),
  code: varchar('code', { length: 10 }).unique().notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
});

export const planeCompanyRelations = relations(planeCompanies, ({ many }) => ({
  planes: many(planes),
}));
