const Joi = require("@hapi/joi");

module.exports.StringName = Joi.string()
  .min(3)
  .max(32);

module.exports.StringDescription = Joi.string()
  .min(3)
  .max(256);

module.exports.StringFbProfile = Joi.string().regex(
  /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i
);

module.exports.StringTwitter = Joi.string().regex(
  /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
);

module.exports.StringLink = Joi.string().regex(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
);

module.exports.StringEmail = Joi.string().email({ minDomainSegments: 2 });
