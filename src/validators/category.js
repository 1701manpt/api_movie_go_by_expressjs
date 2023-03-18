const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    avatar_url: Joi.string().uri().optional(),
})

const update = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    avatar_url: Joi.string().uri().optional(),
})

module.exports = {
    create,
    update,
}
