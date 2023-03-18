const Joi = require('joi')

const create = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required(),
})

const update = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required(),
    deleted: Joi.boolean().optional(),
})

module.exports = {
    create,
    update,
}
