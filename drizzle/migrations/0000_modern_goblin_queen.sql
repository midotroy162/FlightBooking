CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT timezone('UTC', now()),
	"updated_at" timestamp DEFAULT timezone('UTC', now()),
	"first_name" varchar(100),
	"last_name" varchar(100),
	"email" varchar(150) NOT NULL,
	"phone_number" varchar(20),
	"password" varchar(256) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
