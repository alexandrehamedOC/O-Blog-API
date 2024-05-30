-- Revert oblog:functions from pg

BEGIN;

DROP FUNCTION 
  create_posts(json),
  create_categories(json),
  update_posts(json),
  update_categories(json);

COMMIT;
