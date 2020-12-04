const Joi = require('joi');
const reports = require('../constants/reports');

const report = Joi.object({
  title: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9 ]+$/))
    .min(3)
    .max(50)
    .required(),

  type: Joi.valid(...reports).required(),

  done: Joi.boolean().required(),

  details: Joi.string().min(20).required(),
});

module.exports = report;
