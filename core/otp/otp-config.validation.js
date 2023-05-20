const Joi = require("joi");

const addOtpConfigSchema = Joi.object()
  .keys({
    otpLength: Joi.number().required(),
    expirationTime: Joi.string().required().trim(),
    alphabets: Joi.boolean(),
    uppercase: Joi.boolean(),
    specialChar: Joi.boolean(),
    digits: Joi.boolean(),
    type: Joi.string().valid("web", "mobile").required().trim(),
  })
  .meta({ name: "OtpConfig" });

module.exports = { addOtpConfigSchema };
