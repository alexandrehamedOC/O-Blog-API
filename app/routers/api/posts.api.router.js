import express from 'express';
import Controller from '../../controllers/api/posts.controller.js';
import wrapper from '../../middlewares/controller.wrapper.js';
import createSchema from '../../schemas/posts.create.schema.js';
import updateSchema from '../../schemas/posts.update.schema.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.route('/')
  /**
   * GET /api/posts
   * @summary Get all posts
   * @tags Post
   * @return {[Post]} 200 - success response - application/json
   */
  .get(wrapper(Controller.getAll.bind(Controller)))
  /**
   * POST /api/posts
   * @summary Create a post
   * @tags Post
   * @param {InputPost} request.body.required - post info
   * @return {Post} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   */
  .post(validationMiddleware(createSchema, 'body'), wrapper(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
  /**
   * GET /api/posts/{id}
   * @summary Get one post
   * @tags Post
   * @param {number} id.path.required - post identifier
   * @return {Post} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .get(wrapper(Controller.getOne.bind(Controller)))
  /**
   * PATCH /api/posts/{id}
   * @summary Update one post
   * @tags Post
   * @param {number} id.path.required - post identifier
   * @param {InputPost} request.body.required - post info
   * @return {Post} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .patch(validationMiddleware(updateSchema, 'body'), wrapper(Controller.update.bind(Controller)))
  /**
   * DELETE /api/posts/{id}
   * @summary Delete one post
   * @tags Post
   * @param {number} id.path.required - post identifier
   * @return {Post} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .delete(wrapper(Controller.delete.bind(Controller)));

router.route('/categories/:categoryId')
  /**
   * GET /api/posts/category/{id}
   * @summary Get posts by category
   * @tags Post
   * @param {number} id.path.required - category identifier
   * @return {[Post]} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .get(wrapper(Controller.getAllByCategory.bind(Controller)));

export default router;
