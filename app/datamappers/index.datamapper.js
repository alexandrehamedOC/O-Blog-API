import client from '../config/pg.client.js';
import CategoriesDatamapper from './categories.datamapper.js';
import PostsDatamapper from './posts.datamapper.js';

export const categoriesDatamapper = new CategoriesDatamapper(client);

export const postsDatamapper = new PostsDatamapper(client);
