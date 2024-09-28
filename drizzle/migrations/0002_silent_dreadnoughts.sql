ALTER TABLE "plane_companies" ADD COLUMN "password" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "address" varchar(500);--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "is_email_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "is_phone_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "password_changed_at" timestamp;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "email_verification_token" varchar(100);--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "email_verification_token_expires" timestamp;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "phone_verification_code" varchar(10);--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "phone_verification_code_expires" timestamp;--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "password_reset_token" varchar(100);--> statement-breakpoint
ALTER TABLE "plane_companies" ADD COLUMN "password_reset_token_expires" timestamp;