import Joi from 'joi';

export default Joi.object({
  title: Joi.string().min(2),
  slug: Joi.string().min(2).pattern(/^[a-z0-9-]+$/),
  excerpt: Joi.string().min(20),
  content: Joi.string().min(50),
  categories_id: Joi.number().integer(),
}).min(1);
