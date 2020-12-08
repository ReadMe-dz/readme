const Joi = require('joi');
const genres = require('../constants/genres');
const states = require('../constants/states');
const languages = require('../constants/languages');

const book = Joi.object({
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

  publisher: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9_ ]+$/))
    .min(3)
    .max(50)
    .allow(''),

  genre: Joi.valid(...genres).required(),

  state: Joi.valid(...states).required(),

  language: Joi.valid(...languages).required(),

  year: Joi.number().max(new Date().getFullYear()).min(1900).required(),

  price: Joi.number().min(0).required(),

  details: Joi.string().allow(''),

  hearts: Joi.array().items(Joi.string()).allow(),

  search: Joi.string().pattern(new RegExp(/^[a-zA-Z ]+$/)),
});

module.exports = book;
