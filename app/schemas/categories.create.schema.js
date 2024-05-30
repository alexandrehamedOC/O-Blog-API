import Joi from 'joi';

export default Joi.object({
  label: Joi.string().min(2).required(),
  route: Joi.string().min(2).pattern(/^\/[a-z-]*$/).required(),
});
