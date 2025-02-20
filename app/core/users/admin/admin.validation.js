const Joi = require("joi");

const createAdminSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim(),
  superAdmin: Joi.boolean().required().default(false),
}).meta({ name: "CreateAdminSchema" });

const updateAdminSchema = Joi.object({
  name: Joi.string().optional().trim(),
  email: Joi.string().optional().trim().email(),
  password: Joi.string().optional().trim(),
  superAdmin: Joi.boolean().optional().default(false),
}).meta({ name: "UpdateAdminSchema" });

module.exports = { createAdminSchema, updateAdminSchema };
