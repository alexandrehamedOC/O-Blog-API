import express from 'express';
import ApiError from '../errors/api.error.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import apiRouter from './api/index.api.router.js';
import websiteRouter from './website/index.website.router.js';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', websiteRouter);

router.use(() => {
  throw new ApiError('Not Found', {status: 404});
});
router.use(errorMiddleware);

export default router;
