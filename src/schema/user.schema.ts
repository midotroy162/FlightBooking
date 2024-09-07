import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseModel } from './common';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  ...baseModel,
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  email: varchar('email', { length: 150 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  password: varchar('password', { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({}) => ({}));
