import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseModel } from './common';
import { relations } from 'drizzle-orm';

// - id primary key
// - company_name
// - company_code unique
// - company_email unique
// - phone_number
// - created_at
// - updated_at

export const planeCompanies = pgTable('plane_companies', {
  ...baseModel,
  name: varchar('name', { length: 100 }),
  code: varchar('code', { length: 10 }).unique().notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
});

export const planeCompanyRelations = relations(planeCompanies, ({}) => ({}));
