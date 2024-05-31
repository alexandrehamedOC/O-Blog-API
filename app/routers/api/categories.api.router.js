import express from 'express';
import Controller from '../../controllers/api/categories.controller.js';
import wrapper from '../../middlewares/controller.wrapper.js';
import createSchema from '../../schemas/categories.create.schema.js';
import updateSchema from '../../schemas/categories.update.schema.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.route('/')
/**
   * GET /api/categories
   * @summary Get all categories
   * @tags Category
   * @return {[Category]} 200 - success response - application/json
   */
// Comme les method des controller vont être appelés à travers une fonction fléché de callback, elle vont perdre leur contexte. Pour le conserver (l'embarquer avec elles) on peut utiliser la méthode .bind(<contexte>) en fournissant le contexte. Ici on leur attache la classe du controller
/*
Controller.getAll = async getAll(_, res) {
    const rows = await this.mainDatamapper.findAll();
    return res.json({ data: rows });
  }
Quand le routeur va executer la function il va faire getAll()
Donc ici on a plus de reference pour this
dans le cas ou l'on execute Controller.getAll() alors que le contexte est a gauche du point alors on a le contexte
*/
  .get(wrapper(Controller.getAll.bind(Controller)))
  /**
   * POST /api/categories
   * @summary Create a category
   * @tags Category
   * @param {InputCategory} request.body.required - category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .post(validationMiddleware(createSchema, 'body'), wrapper(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
  /**
   * GET /api/categories/{id}
   * @summary Get one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .get(wrapper(Controller.getOne.bind(Controller)))
  /**
   * PATCH /api/categories/{id}
   * @summary Update one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @param {InputCategory} request.body.required - category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .patch(validationMiddleware(updateSchema, 'update'), wrapper(Controller.update.bind(Controller)))
  /**
   * DELETE /api/categories/{id}
   * @summary Delete one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .delete(wrapper(Controller.delete.bind(Controller)));

export default router;
/*
const obj = {
  context: function(){
    console.log(this);//affiche obj
  },
  alsoContext(){
    console.log(this);//affiche obj
  },
  noContext: () => {
    console.log(this);//affiche undefined
  },
};
console.log(obj.noContext());
*/
