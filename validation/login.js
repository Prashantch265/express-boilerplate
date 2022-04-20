const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
    password: Joi.string().required(),
  })
  .meta({ className: "login" });
