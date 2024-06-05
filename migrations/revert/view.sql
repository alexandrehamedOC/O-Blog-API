-- Revert oblog:view from pg

BEGIN;

DROP VIEW "posts_with_category";

COMMIT;
