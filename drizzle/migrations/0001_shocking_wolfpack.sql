CREATE TABLE IF NOT EXISTS "plane_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT timezone('UTC', now()),
	"updated_at" timestamp DEFAULT timezone('UTC', now()),
	"name" varchar(100),
	"code" varchar(10) NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone_number" varchar(20),
	CONSTRAINT "plane_companies_code_unique" UNIQUE("code"),
	CONSTRAINT "plane_companies_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planes" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT timezone('UTC', now()),
	"updated_at" timestamp DEFAULT timezone('UTC', now()),
	"capacity" integer,
	"model" varchar(100),
	"manufacture_year" integer,
	"company_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planes" ADD CONSTRAINT "planes_company_id_plane_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."plane_companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
