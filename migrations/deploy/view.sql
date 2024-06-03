-- Deploy oblog:view to pg

BEGIN;

CREATE VIEW "posts_with_category" AS
SELECT 
	"posts".*,
	"categories"."label" AS "category"
FROM "posts"
JOIN "categories"
	ON "categories"."id" = "posts"."categories_id";

COMMIT;
