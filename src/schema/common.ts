import { serial, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const timestamps = {
  createdAt: timestamp('created_at').default(sql`timezone('UTC', now())`),
  updatedAt: timestamp('updated_at')
    .default(sql`timezone('UTC', now())`)
    .$onUpdate(() => new Date()),
};

export const baseModel = {
  id: serial('id').primaryKey(),
  ...timestamps,
};
