-- Revert oblog:constraints from pg

BEGIN;

ALTER TABLE "posts"
  DROP CONSTRAINT "posts_slug_check";

ALTER TABLE "categories"
  DROP CONSTRAINT "categories_route_check";

COMMIT;
