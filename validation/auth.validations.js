const joi = require('joi');

const createUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  name: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  createUserSchema,
  loginSchema,
};
