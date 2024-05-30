-- Verify oblog:base-structure on pg

BEGIN;

SELECT "label", "route" FROM "categories" WHERE false;

SELECT "title", "slug", "excerpt", "content" FROM "posts" WHERE false;

ROLLBACK;
