import Joi from 'joi';

export default Joi.object({
  label: Joi.string().min(2),
  route: Joi.string().min(2).pattern(/^\/[a-z-]*$/),
}).min(1);
