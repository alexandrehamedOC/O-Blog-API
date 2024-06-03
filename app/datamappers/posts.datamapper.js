import CoreDatamapper from './core.datamapper.js';

/**
 * @typedef {object} Post
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} slug - URL d'accès au post (pour le SEO)
 * @property {string} title - Titre de l'article
 * @property {string} excerpt - Texte d'introduction de l'article
 * @property {string} content - Contenu de l'article
 * @property {number} categoryId - Id de la catégorie à laquelle est rattaché le posts
 */

/**
 * @typedef {object} InputPost
 * @property {string} slug - URL d'accès au post (pour le SEO)
 * @property {string} title - Titre de l'article
 * @property {string} excerpt - Texte d'introduction de l'article
 * @property {string} content - Contenu de l'article
 * @property {number} categoryId - Id de la catégorie à laquelle est rattaché le posts
 */

export default class CategoriesDatamapper extends CoreDatamapper {
  static tableName = 'posts';

  static queryStr = `
    SELECT 
      "posts".*,
      "categories"."label" AS "category" 
    FROM "posts"
    JOIN "categories"
      ON "categories"."id" = "posts"."categories_id"
  `;

  async findAll() {
    const result = await this.client.query(this.queryStr);
    return result.rows;
  }

  async findById(id) {
    const result = await this.client.query(`
      ${this.queryStr}
      WHERE "posts"."id" = $1
    `, [id]);
    return result.rows[0];
  }

  /*
{
    "id": 1,
    "title": "Angular, une fausse bonne idée ?",
    "slug": "angular-une-fausse-bonne-idee",
    "excerpt": "Lorem …",
    "content": "Angular, …",
    "categories_id": 2,
    "created_at": "2024-05-31T11:32:58.140Z",
    "updated_at": null,
    "id": 2,
    "label": "Angular",
    "route": "/angular",
    "created_at": "2024-05-31T11:32:58.140Z",
    "updated_at": null
  }

  {
    "title": "Angular, une fausse bonne idée ?",
    "slug": "angular-une-fausse-bonne-idee",
    "excerpt": "Lorem …",
    "content": "Angular, …",
    "categories_id": 2,
    "id": 2,
    "label": "Angular",
    "route": "/angular",
    "created_at": "2024-05-31T11:32:58.140Z",
    "updated_at": null
  }
  */

  async findByCategory(categoryId) {
    const result = await this.client.query(`
    ${this.queryStr}
      WHERE categories_id = $1
    `, [categoryId]);
    return result.rows;
  }
}
