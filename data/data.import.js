import 'dotenv/config';
import pg from 'pg';
import { readFile } from 'node:fs/promises';
import debug from 'debug';

const debugCategoriesImport = debug('import:categories');
const debugPostsImport = debug('import:posts');

const { Client } = pg;

const client = new Client({connectionString: process.env.PGURL, ssl:true});
await client.connect();

// Premère chose à faire, s'assurer que les tables sont bien vides
await client.query('TRUNCATE TABLE "posts", "categories" RESTART IDENTITY');

const postJsonFileContent = await readFile(
  new URL('./posts.json', import.meta.url),
);
const postsData = JSON.parse(postJsonFileContent);
// postsData = [{category: 'angular', title: '', …}, …]
debugPostsImport(`Found ${postsData.length} from JSON`);

const categoriesJsonFileContent = await readFile(
  new URL('./categories.json', import.meta.url),
);
const categoriesData = JSON.parse(categoriesJsonFileContent);
debugCategoriesImport(`Found ${categoriesData.length} from JSON`);
// categoriesData = [{route: '/', label: 'Accueil'}, …]

// Transformation un tableau d'objet en un tableau de requêtes SQL
/*
[
  'INSERT INTO "categories" ("label", "route") VALUES ('mon titre', '/ma-route)',
  'INSERT INTO "categories" ("label", "route") VALUES ('mon titre 2', '/ma-route-2)',
  …
]
*/

// Transformation un tableau d'objet en un tableau de values qui seront utilisés dans une requête SQL
/*
[
  "('mon titre', '/ma-route')",
  "('mon titre 2', '/ma-route-2')",
  …
]
*/

const categoriesSqlValues = categoriesData.map((category) => `(
  '${category.label}',
  '${category.route}'
)`);
const categoriesQuery = await client.query(`INSERT INTO "categories" ("label", "route") VALUES ${categoriesSqlValues} RETURNING *`);
const insertedCategories = categoriesQuery.rows;
// Je reçois un tableau de type [{id: 1, route: '/', 'label': 'accueil', created_at: '…', …}, …]
debugCategoriesImport(`${insertedCategories.length} inserted in DB`);

// Pour l'insertion des posts même principe, mais j'aurai une donnée dynamique en plus du JSON : l'id de la catégorie précédemment inséré.
const postsSqlValues = postsData.map((post) => {
  // je récupère l'objet de catégorie, précédemment inséré, qui cvorrespond au label de la catégorie du post
  const postCategory = insertedCategories.find((category) => category.label === post.category);
  // Je fabrique ma "VALUE"
  // On pense a échappé les caractère simple quote dans le resumé et le contenu pour eviter des erreurs de syntaxe SQL
  return `(
    '${post.title}',
    '${post.slug}',
    '${post.excerpt.replaceAll("'", "''")}',
    '${post.content.replaceAll("'", "''")}',
    ${postCategory.id}
  )`;
});
const postsQuery = await client.query(`INSERT INTO "posts" ("title", "slug", "excerpt", "content", "categories_id") VALUES ${postsSqlValues} RETURNING *`);
const insertedPosts = postsQuery.rows;
debugPostsImport(`${insertedPosts.length} inserted in DB`);

// Quand on fait un script one shot, on doit se deconnecter à la fin de la BDD
client.end();
