const Joi = require("joi");

const loginWithPasswordSchema = Joi.object({
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim(),
}).meta({ name: "LoginWithPasswordSchema" });

module.exports = { loginWithPasswordSchema };
