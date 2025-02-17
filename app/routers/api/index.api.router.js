import express from 'express';
import categoriesRouter from './categories.api.router.js';
import postsRouter from './posts.api.router.js';

const router = express.Router();

router.use((_, res, next) => {
  res.returnFormat = 'json';
  next();
});

/**
 * @route   GET /api/categories/…
 */
router.use('/categories', categoriesRouter);
/**
 * @route   GET /api/posts/…
 */
router.use('/posts', postsRouter);

export default router;
