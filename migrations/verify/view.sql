-- Verify oblog:view on pg

BEGIN;

SELECT * FROM  "posts_with_category" WHERE false;

ROLLBACK;
