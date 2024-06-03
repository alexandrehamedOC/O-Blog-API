/* eslint-disable no-unused-vars */
import logger from '../utils/logger.js';
/**
 * @typedef {object} ApiError
 * @property {string} message - Error message
 * @property {string} name - Error name
 * @property {object} infos - Additionnal informations
 */
export default (err, req, res, next) => {
  let { status, message } = err;

  if(err.name === 'ValidationError'){
    status = 400;
    message = err.details.map((detail) => detail.message);
  }

  if(err.name === 'error' && err.code === '23505'){
    status = 400;
    message = err.detail;
  }

  if (!status) {
    status = 500;
  }

  if (status === 500) {
    logger.error('', err);
    message = 'Internal Server Error';
  }

  if (res.returnFormat === 'html') {
    return res.status(status).render('error', {
      httpStatus: status,
      message,
    });
  }

  return res.status(status).json({ error: message });
};
