import express from 'express';
import Controller from '../../controllers/api/categories.controller.js';
import wrapper from '../../middlewares/controller.wrapper.js';
import createSchema from '../../schemas/categories.create.schema.js';
import updateSchema from '../../schemas/categories.update.schema.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const router = express.Router();
router.route('/')
  // Comme les method des controller vont être appelés à travers une fonction fléché de callback, elle vont perdre leur contexte. Pour le conserver (l'embarquer avec elles) on peut utiliser la méthode .bind(<contexte>) en fournissant le contexte. Ici on leur attache la classe du controller
  .get(wrapper(Controller.getAll.bind(Controller)))
  .post(validationMiddleware(createSchema, 'body'), wrapper(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
  .get(wrapper(Controller.getOne.bind(Controller)))
  .patch(validationMiddleware(updateSchema, 'update'), wrapper(Controller.update.bind(Controller)))
  .delete(wrapper(Controller.delete.bind(Controller)));

export default router;
