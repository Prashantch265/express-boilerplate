const Joi = require("joi");

const externalUserLoginSchema = Joi.object()
  .keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  })
  .meta({ name: "ExternalUserLogin" });

module.exports = { externalUserLoginSchema };
