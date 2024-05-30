-- Revert oblog:post-views from pg

BEGIN;

DROP VIEW "posts_with_category_label";

COMMIT;
