const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    genre: Joi.string().required(),
    duration: Joi.number().min(0).max(21600).required(),
    description: Joi.string().max(2000).optional(),
    poster_url: Joi.string().uri().required(),
    trailer_url: Joi.string().uri().required(),
})

const update = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    genre: Joi.string().required(),
    duration: Joi.number().min(0).max(21600).required(),
    description: Joi.string().max(2000).optional(),
    poster_url: Joi.string().uri().required(),
    trailer_url: Joi.string().uri().required(),
})

module.exports = {
    create,
    update,
}
