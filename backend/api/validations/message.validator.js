const Joi = require('joi');

const message = Joi.object({
  from: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    .required(),

  to: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    .required(),

  content: Joi.string().min(5).required(),
});

module.exports = message;
