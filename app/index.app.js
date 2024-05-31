import express from 'express';
import router from './routers/index.router.js';
import docMiddleware from './middlewares/doc.middleware.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

docMiddleware(app);

app.use(router);

export default app;
