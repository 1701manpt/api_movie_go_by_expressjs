// models
const Order = require('../models/order')
const Customer = require('../models/customer')
const OrderStatus = require('../models/orderStatus')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const instance = await Order.findAll({ include: ['customer', 'orderStatus'] })

        res.json(display(200, 'List of order returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const instance = await Order.findByPk(req.params.id, { include: ['customer', 'orderStatus'] })
        if (!instance) {
            return next(display(404, 'Order not found'))
        }

        res.json(display(200, 'Order returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const instance = await Customer.findByPk(req.body.customerId)
        if (!instance) {
            return next(display(400, 'Customer not exist'))
        }

        const instance2 = await OrderStatus.findOne({ where: { code: 1 } })
        if (!instance2) {
            return next(display(400, 'OrderStatus not exist'))
        }

        const newInstance = await Order.create({
            customerId: req.body.customerId,
            orderStatusId: instance2.id
        })

        res.json(display(200, 'Order created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const instance = await Order.findByPk(req.params.id)
        if (!instance) {
            return next(404, 'Order not found')
        }

        const [result, newInstance] = await Order.update({
            orderStatusId: req.body.orderStatusId,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.json(display(200, 'Order updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Order.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Order not found'))
        }

        const newInstance = await Order.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'Order deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'Order not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'Order must be soft deleted before continue'))
            }
        }

        const newInstance = await Order.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.json(display(200, 'Order deleted successfully', newInstance))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'Order not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'Order must be soft deleted before continue'))
            }
        }

        const newInstance = await Order.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'Order restored successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

module.exports = { getAll, getById, create, update, destroy, destroyForce, restore }