const Joi = require("joi");

module.exports = Joi.object().keys({
  firstName: Joi.string().pattern(/^[A-Za-z]+$/).min(4).max(10).required(),
  middleName: Joi.string().allow("").optional(),
  lastName: Joi.string().min(4).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    )
    .min(8)
    .max(12)
    .required(),
});
