import CoreController from './core.controller.js';
import { categoriesDatamapper } from '../../datamappers/index.datamapper.js';

export default class CategoriesController extends CoreController {
  static entityName = 'Category';

  static mainDatamapper = categoriesDatamapper;
}
