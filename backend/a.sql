BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "locks" (
	"id"	text,
	"status"	text,
	"price"	real,
	"size"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"gender_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"email"	text,
	"password"	text,
	"first_name"	text,
	"last_name"	text,
	"tel"	text,
	"profile"	text,
	"gender_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_genders_users" FOREIGN KEY("gender_id") REFERENCES "genders"("id")
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"category_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "shops" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"national_id"	text,
	"category_id"	integer,
	"shop_name"	text,
	"description"	text,
	"shop_img"	text,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_shops" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_categories_shop" FOREIGN KEY("category_id") REFERENCES "categories"("id")
);
CREATE TABLE IF NOT EXISTS "reserves" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date"	datetime,
	"shop_id"	integer,
	"total_price"	real,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_shops_reserve" FOREIGN KEY("shop_id") REFERENCES "shops"("id")
);
CREATE TABLE IF NOT EXISTS "reserve_details" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"reserve_id"	integer,
	"lock_id"	text,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_reserves_reserve_details" FOREIGN KEY("reserve_id") REFERENCES "reserves"("id"),
	CONSTRAINT "fk_locks_reserve_details" FOREIGN KEY("lock_id") REFERENCES "locks"("id")
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_categories_deleted_at" ON "categories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_shops_deleted_at" ON "shops" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_reserves_deleted_at" ON "reserves" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_reserve_details_deleted_at" ON "reserve_details" (
	"deleted_at"
);
COMMIT;
