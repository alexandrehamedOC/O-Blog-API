-- Revert oblog:base-structure from pg

BEGIN;

DROP TABLE "posts", "categories";

COMMIT;
