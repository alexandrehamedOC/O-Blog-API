-- Verify oblog:post-views on pg

BEGIN;

SELECT "id", "title", "slug", "excerpt", "content", "category" FROM "posts_with_category_label" WHERE false;

ROLLBACK;
