-- Deploy oblog:constraints to pg

BEGIN;

ALTER TABLE "categories"
  ADD CONSTRAINT "categories_route_check" CHECK (route ~ '^/[a-z0-9-]*$');

ALTER TABLE "posts"
  ADD CONSTRAINT "posts_slug_check" CHECK (slug ~ '^[a-z0-9-]+$');

COMMIT;
