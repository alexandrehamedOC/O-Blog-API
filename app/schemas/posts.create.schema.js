import Joi from 'joi';

export default Joi.object({
  title: Joi.string().min(2).required(),
  slug: Joi.string().min(2).pattern(/^[a-z0-9-]+$/).required(),
  excerpt: Joi.string().min(20),
  content: Joi.string().min(50),
  categories_id: Joi.number().integer().required(),
});
