import CoreDatamapper from './core.datamapper.js';

/**
 * @typedef {object} Category
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} route - Segment d'URL pour accéder à la catégorie (pour SEO)
 * @property {string} label - Le nom affichable de la catégorie
 */

/**
 * @typedef {Object} InputCategory
 * @property {string} route - Segment d'URL pour accéder à la catégorie (pour SEO)
 * @property {string} label - Le nom affichable de la catégorie
 */

export default class CategoriesDatamapper extends CoreDatamapper {
  // Ici on pas de vue, bah on récupère directement de la table
  static readTableName = 'categories';
  static writeTableName = 'categories';
}
