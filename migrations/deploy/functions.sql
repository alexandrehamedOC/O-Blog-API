-- Deploy oblog:functions to pg

BEGIN;

-- Afin de simplifier notre application et de standardiser les opérations de CRUD, et ainsi nous aider a factoriser nos datamappers
-- On créer des fonctions pour chaque opération d'évolution de notre BDD

-- Create : l'instruction ici sera d'insérer un nouvel enregistrement dans la table "posts"
-- On lui précise qu'elle recevra les informations à inséré sous form de JSON. 
-- On v eut en retour l'enregistrement complet inséré dans la table "posts"
-- Une table à toujours un type complexe qui porte son nom et représente un enregistrement des celle-ci
CREATE FUNCTION create_posts(input json) RETURNS posts AS $$

  -- l'instruction à l'intérieur de la fonction va effectivement insérer les informations dans la table
  INSERT INTO "posts" ("title", "slug", "excerpt", "content", "categories_id") 
  -- Pour lui préciser les valeurs à utiliser on utilise l'opérateur JSON ->> qui permet de récupérer la valeur d'une propriété du JSON interprété par PG
	VALUES (
    -- L'opérateur ->> récupère toujours la valeur au format TEXT
		input->>'title',--(input->>'title')::text
		input->>'slug',
		input->>'excerpt',
		input->>'content',
    -- S'il on souhaite inséré autre chose que du texte, comme ici un entier, il faut convertir la donnée au format désiré.
		(input->>'categories_id')::int
	)
  -- Dans tout les cas il faudra retourner de valeurs qui corresponde au type défini dans le retour de la fonction
  -- On retourne ici tous les champs de la table.
  RETURNING *;

-- On précise evidemment que le langage utilisé dans cette fonction est : SQL
-- On ajoute également l'option STRICT qui permet de lui dire de toujours renvoyer une enregistrement "post" même si le JSON envoyé est null. Cet enregistrement sur rempli de valeur null, car il n'aura rien inséré, il n'aura même pas chercher a exécuter la requête d'insertion, car la valeur d'entrée était null.
-- Ce qui est gros gain en terme de performance. Il ne fait rien car il connait à l'avance le résultat.
$$ LANGUAGE sql STRICT;

CREATE FUNCTION create_categories(input json) RETURNS categories AS $$

  -- l'instruction à l'intérieur de la fonction va effectivement insérer les informations dans la table
  INSERT INTO "categories" ("label", "route") 
	VALUES (
		input->>'label',
		input->>'route'
	)
  RETURNING *;

$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_posts(input json) RETURNS posts AS $$

  UPDATE "posts" SET
    "title" = input->>'title',
    "slug" = input->>'slug',
    "excerpt" = input->>'excerpt',
    "content" = input->>'content',
    "categories_id" = (input->>'categories_id')::int  
	WHERE "id" = (input->>'id')::int
  RETURNING *;

$$ LANGUAGE sql STRICT;

-- On peut si on le souhaite ne pas préciser de nom de paramètre, il fera alors référence au paramètre avec un $ suivi de sa position dans la liste des paramètres de la foonction
CREATE FUNCTION update_categories(json) RETURNS categories AS $$

  UPDATE "categories" SET
    "label" = $1->>'label',
    "route" = $1->>'route' 
	WHERE "id" = ($1->>'id')::int
  RETURNING *;

$$ LANGUAGE sql STRICT;

COMMIT;
