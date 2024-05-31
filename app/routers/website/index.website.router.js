import express from 'express';
import controller from '../../controllers/website/index.website.controller.js';

const router = express.Router();

router.use((_, res, next) => {
  if(!res.returnFormat){
    res.returnFormat = 'html';
  }
  next();
});

// GET /
router.get('/', controller.homePage);

export default router;
