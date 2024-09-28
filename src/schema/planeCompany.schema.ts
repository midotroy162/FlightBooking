import { pgTable, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { baseModel } from './common';
import { relations } from 'drizzle-orm';
import { planes } from './plane.schema';

export const planeCompanies = pgTable('plane_companies', {
  ...baseModel,
  name: varchar('name', { length: 100 }),
  code: varchar('code', { length: 10 }).unique().notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  password: varchar('password', { length: 256 }).notNull(),
  address: varchar('address', { length: 500 }),
  isEmailVerified: boolean('is_email_verified').default(false),
  isPhoneVerified: boolean('is_phone_verified').default(false),
  passwordChangedAt: timestamp('password_changed_at'),
  emailVerificationToken: varchar('email_verification_token', { length: 100 }),
  emailVerificationTokenExpires: timestamp('email_verification_token_expires'),
  phoneVerificationCode: varchar('phone_verification_code', { length: 10 }),
  phoneVerificationCodeExpires: timestamp('phone_verification_code_expires'),
  passwordResetToken: varchar('password_reset_token', { length: 100 }),
  passwordResetTokenExpires: timestamp('password_reset_token_expires'),
});

export const planeCompanyRelations = relations(planeCompanies, ({ many }) => ({
  planes: many(planes),
}));
