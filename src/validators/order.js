const Joi = require('joi')
const orderLineSchema = require('~/validators/order-line')

const create = Joi.object({
    order_lines: Joi.array().items(orderLineSchema.create).min(1).required(),
})

const update = Joi.object({
    order_lines: Joi.array().items(orderLineSchema.update).min(1).required(),
})

module.exports = {
    create,
    update,
}
