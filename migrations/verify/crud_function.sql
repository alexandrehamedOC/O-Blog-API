-- Verify oblog:crud_function on pg

BEGIN;

SELECT * FROM insert_posts('{"title": "titre", "slug": "titre-slug", "categories_id": 1}'::json) WHERE false;
SELECT * FROM update_posts(1, '{"title": "titre", "slug": "titre-slug", "categories_id": 1}'::json) WHERE false;
SELECT * FROM insert_categories('{"label": "libellé", "route": "/libelle"}'::json) WHERE false;
SELECT * FROM update_categories(1, '{"label": "libellé", "slug": "/libelle"}'::json) WHERE false;

ROLLBACK;
