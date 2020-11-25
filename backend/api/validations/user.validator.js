const Joi = require('joi');
const wilayas = require('../constants/wilayas');

const user = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]+$/))
    .min(3)
    .max(15),

  username: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9_]+$/))
    .min(3)
    .max(9),

  password: Joi.string().min(8).max(20),

  birthdate: Joi.date().raw().required(),

  email: Joi.string().email(),

  phone: Joi.string()
    .pattern(
      // eslint-disable-next-line
      new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    )
    .allow(''),

  twitter: Joi.string()
    .pattern(
      // eslint-disable-next-line
      new RegExp(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i)
    )
    .allow(''),

  facebook: Joi.string()
    .pattern(
      new RegExp(
        // eslint-disable-next-line
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i
      )
    )
    .allow(''),

  wilaya: Joi.valid(...wilayas),

  terms: Joi.boolean().valid(true),

  moreInfo: Joi.string().allow(''),
});

module.exports = user;
