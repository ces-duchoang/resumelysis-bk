const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
}).required();

const accountSchema = userSchema.keys({ name: Joi.any(), remember: Joi.boolean() });

const isValidUserObject = user => !userSchema.validate(user).error;

const isValidAccountObject = account => !accountSchema.validate(account).error;

module.exports = { isValidUserObject, isValidAccountObject };
