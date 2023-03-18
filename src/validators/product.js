const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().min(3).max(50).regex(/^[a-zA-Z0-9_ ]+$/).required(),
    avatar_url: Joi.string().pattern(/^https?:\/\/\S+$/).optional(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(2000).optional(),
    category_id: Joi.number().integer().positive().optional(),
})

const update = Joi.object({
    name: Joi.string().min(3).max(50).regex(/^[a-zA-Z0-9_ ]+$/).required(),
    avatar_url: Joi.string().pattern(/^https?:\/\/\S+$/).optional(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(2000).optional(),
    category_id: Joi.number().integer().positive().optional(),
})

module.exports = {
    create,
    update,
}
