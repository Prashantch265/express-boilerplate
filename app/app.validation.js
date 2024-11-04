const Joi = require("joi");

const addAppConfigSchema = Joi.object({
  name: Joi.string().required().trim(),
  value: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
}).meta({ name: "AppConfig" });

module.exports = { addAppConfigSchema };
