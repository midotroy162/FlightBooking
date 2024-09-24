import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';
import { baseModel } from './common';
import { relations } from 'drizzle-orm';
import { planeCompanies } from './planeCompany.schema';

export const planes = pgTable('planes', {
  ...baseModel,
  capacity: integer('capacity'),
  model: varchar('model', { length: 100 }),
  manufactureYear: integer('manufacture_year'),
  companyId: integer('company_id')
    .references(() => planeCompanies.id, { onDelete: 'cascade' })
    .notNull(),
});

export const planeRelations = relations(planes, ({ one }) => ({
  company: one(planeCompanies, {
    fields: [planes.companyId],
    references: [planeCompanies.id],
  }),
}));
