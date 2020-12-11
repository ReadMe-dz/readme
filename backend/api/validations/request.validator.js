const Joi = require('joi');
const languages = require('../constants/languages');

const request = Joi.object({
  user: Joi.string()
    .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    .required(),

  author: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]+$/))
    .min(3)
    .max(50)
    .required(),

  title: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9_ ]+$/))
    .min(3)
    .max(50)
    .required(),

  language: Joi.valid(...languages).required(),

  details: Joi.string().allow(''),

  comments: Joi.array().items(Joi.string()).allow(),
});

module.exports = request;
