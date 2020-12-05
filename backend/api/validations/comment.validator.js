const Joi = require('joi');

const comment = Joi.object({
  user: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    .required(),

  bookId: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    .required(),

  content: Joi.string().min(5).required(),
});

module.exports = comment;
