-- Verify oblog:functions on pg

BEGIN;

SELECT create_posts('{"title": "test", "slug": "test-test", "excerpt":"test", "content": "test", "categories_id": 1}') WHERE false;
SELECT create_categories('{"label": "test", "route": "/test-test"}') WHERE false;
SELECT update_posts('{"title": "test", "slug": "test-test", "excerpt":"test", "content": "test", "categories_id": 1, "id":1}') WHERE false;
SELECT update_categories('{"label": "test", "route": "/test-test", "categories_id": 1, "id":1}') WHERE false;

ROLLBACK;
