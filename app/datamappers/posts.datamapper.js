import CoreDatamapper from './core.datamapper.js';

export default class CategoriesDatamapper extends CoreDatamapper {
  static tableName = 'posts';

  async findByCategory(categoryId) {
    const result = await this.client.query(`
      SELECT * FROM "${this.constructor.tableName}"
      WHERE categories_id = $1
    `, [categoryId]);
    return result.rows;
  }
}
