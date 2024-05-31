import CoreController from './core.controller.js';
import { postsDatamapper, categoriesDatamapper } from '../../datamappers/index.datamapper.js';
import ApiError from '../../errors/api.error.js';

export default class PostController extends CoreController {
  static entityName = 'Post';

  static mainDatamapper = postsDatamapper;

  static async getAllByCategory(req, res, next) {
    const { categoryId } = req.params;

    const category = await categoriesDatamapper.findById(categoryId);
    if (!category) {
      return next(new ApiError('Category not found', {status: 404}));
    }

    const rows = await this.mainDatamapper.findByCategory(categoryId);
    return res.json({ data: rows });
  }
}
