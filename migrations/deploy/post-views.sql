-- Deploy oblog:post-views to pg

BEGIN;

-- Une vue permet de stocker une requête, et non de la donnée dans la BDD.
-- Une fois la vur créer je pourrais récupérer de l'information depuis cette table virtuelle comme si c'était une vrai table physique.
-- Au moment de la requête vers cette vue, il va d'abord exécuter les requête contenu dans la vue, en conservent les données en mémoire vive, et ces données serviront de table pour la récupération de la première requête.
-- Donc les données récupérés de cette vue seront toujours synchrone avec les données de tebales physique.
-- On ne peut pas insérer, modifier, supprimer des données en se servant d'une vue.
CREATE VIEW "posts_with_category_label" AS
SELECT
    posts.*,
    categories.label AS category
  FROM posts
  JOIN categories
    ON categories.id = posts.categories_id;

COMMIT;
