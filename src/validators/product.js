const Joi = require('joi')

exports.create = Joi.object({
    avatar: Joi.string().allow(null).optional(),
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow(null).optional(),
    categoryId: Joi.number().allow(null).optional(),
})

exports.update = Joi.object({
    avatar: Joi.string().allow(null).optional(),
    name: Joi.string().min(1),
    price: Joi.number().positive().min(1),
    description: Joi.string().allow(null).optional(),
    categoryId: Joi.number().allow(null).optional(),
})
