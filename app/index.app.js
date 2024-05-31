import express from 'express';
import router from './routers/index.router.js';
import docMiddleware from './middlewares/doc.middleware.js';
import logger from './utils/logger.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
  const infos = {
    url: req.url,
    method: req.method,
    agent: req.headers['user-agent'],
  };
  logger.http(req.url, infos);
  next();
});

docMiddleware(app);

app.use(router);

export default app;
