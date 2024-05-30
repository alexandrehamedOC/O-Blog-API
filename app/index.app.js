import express from 'express';
import router from './routers/index.router.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
