-- Deploy oblog:crud_function to pg

BEGIN;

-- On peut definir un argument de type JSON en entrée ce qui va grandement nous simplifier la vie pour l'implémentation de la function et de son utilisation dans notre API
CREATE FUNCTION "insert_posts" (json) RETURNS posts AS $$

  INSERT INTO "posts" (
    title,
    slug,
    excerpt,
    content,
    categories_id
  ) VALUES (
    $1->>'title', -- $1 represente le premier argument, $2 le 2eme, etc…
    $1->>'slug', -- On oubli pas les simple guillement pour préciser le nom de la propriété dont on veut récupérer la valeur
    $1->>'excerpt',
    $1->>'content',
    ($1->>'categories_id')::int -- on peut caster la valeur de retour de la lecture sous forme de text de la valeur d'une propriété. Mais pour cela on doit créer un contexte autour de l'interpretatyion de la valeur, car sinon on cast le nom de la propriété et non la valeur elle-même
    /*
    $1->>'categories_id' renvoi '1'
    ($1->>'categories_id')::int renvoi 1
    */
  ) RETURNING *

$$ language sql STRICT; -- dans le cas ou l'on utilise JSON, c'est l'objet complet qui est nécessaire à l'execution de l'insert, si aucun objet JSON n'ai fourni on n'essaye même pas d'éxéecuter l'insert et cela revoi un enregistrement rempli de valeur null

CREATE FUNCTION update_posts (input_id int, input json) RETURNS posts AS $$

  UPDATE "posts" SET
    title = input->>'title',
    slug = input->>'slug',
    excerpt = input->>'excerpt',
    content = input->>'content',
    categories_id = (input->>'categories_id')::int,
    updated_at = now()
  WHERE id = input_id
  RETURNING *

$$ language sql STRICT; 

CREATE FUNCTION "insert_categories" (json) RETURNS categories AS $$

  INSERT INTO "categories" (
    label,
    route
  ) VALUES (
    $1->>'label',
    $1->>'route'
  ) RETURNING *

$$ language sql STRICT;

CREATE FUNCTION update_categories (input_id int, input json) RETURNS categories AS $$

  UPDATE "categories" SET
    label = input->>'label',
    route = input->>'route',
    updated_at = now()
  WHERE id = input_id
  RETURNING *

$$ language sql STRICT;

COMMIT;
