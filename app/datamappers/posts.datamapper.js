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
  // Quand on fera un select on ira chercher dans la vue
  static readTableName = 'posts_with_category';
  // Quand on fera une mutation (insert, update, delete)
  static writeTableName = 'posts';

  async findByCategory(categoryId) {
    const result = await this.client.query(`
      SELECT * FROM "posts_with_category"
      WHERE categories_id = $1
    `, [categoryId]);
    return result.rows;
  }
}
