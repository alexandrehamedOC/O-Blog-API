import express from 'express';
import controller from '../../controllers/website/index.website.controller.js';

const router = express.Router();

router.use((req, _, next) => {
  req.format = 'html';
  next();
});

// GET /
router.get('/', controller.homePage);

export default router;
