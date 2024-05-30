import express from 'express';
import Controller from '../../controllers/api/posts.controller.js';
import wrapper from '../../middlewares/controller.wrapper.js';
import createSchema from '../../schemas/posts.create.schema.js';
import updateSchema from '../../schemas/posts.update.schema.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.route('/')
  .get(wrapper(Controller.getAll.bind(Controller)))
  .post(validationMiddleware(createSchema, 'body'), wrapper(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
  .get(wrapper(Controller.getOne.bind(Controller)))
  .patch(validationMiddleware(updateSchema, 'body'), wrapper(Controller.update.bind(Controller)))
  .delete(wrapper(Controller.delete.bind(Controller)));

router.route('/categories/:categoryId')
  .get(wrapper(Controller.getAllByCategory.bind(Controller)));

export default router;
