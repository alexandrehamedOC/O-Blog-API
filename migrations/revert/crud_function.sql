-- Revert oblog:crud_function from pg

BEGIN;

DROP FUNCTION insert_posts, insert_categories, update_posts, update_categories;

COMMIT;
