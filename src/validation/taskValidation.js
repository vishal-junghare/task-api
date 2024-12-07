// src/validation/taskValidation.js
const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
  dueDate: Joi.date(),
});

module.exports = taskValidationSchema;