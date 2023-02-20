const Joi = require('joi');

const productSchema = Joi.object({
   avatar: Joi.string().allow(null).optional(),
   name: Joi.string().required(),
   price: Joi.number().positive().required(),
   description: Joi.string().allow(null).optional(),
   categoryId: Joi.number().allow(null).optional(),
});

module.exports = productSchema;