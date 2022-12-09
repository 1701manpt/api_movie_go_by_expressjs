const express = require('express')
const router = express.Router()

// modal
const Order = require('../models/order')
const Customer = require('../models/customer')
const OrderStatus = require('../models/orderStatus')

// validate
// const { checkId, checkCreate } = require('../validations/customer')

// middleware
// const logValidation = require('../middlewares/validation')

// utils
const display = require('../utils/display')

router.get('/', async (req, res, next) => {
    try {
        const instance = await Order.findAll({ include: ['customer', 'orderStatus'] })

        res.json(display(200, 'List of order returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
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
})

router.post('/', async (req, res, next) => {
    try {
        const instance = await Customer.findByPk(req.body.customerId)
        if (!instance) {
            return next(display(400, 'Customer not exist'))
        }

        const instance2 = await OrderStatus.findByPk(req.body.orderStatusId)
        if (!instance2) {
            return next(display(400, 'OrderStatus not exist'))
        }

        const instance3 = await OrderStatus.findAll({}, {
            order: [
                ['code', 'ASC']
            ]
        })
        const instance4 = await OrderStatus.findByPk(req.body.orderStatusId)
        if (instance3[0].code !== instance4.code) {
            return next(display(400, 'OrderStatus not accepted'))
        }

        const newInstance = await Order.create({
            customerId: req.body.customerId,
            orderStatusId: req.body.orderStatusId
        })

        res.json(display(200, 'Order created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
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
})

router.delete('/:id', async (req, res, next) => {
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
})

router.post('/:id', async (req, res, next) => {
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
})

router.delete('/:id/destroy', async (req, res, next) => {
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
})

module.exports = router