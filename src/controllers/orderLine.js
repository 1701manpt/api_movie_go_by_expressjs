// modal
const OrderLine = require('../models/orderLine')
const Order = require('../models/order')
const Product = require('../models/product')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
   try {
      // const instance = await OrderLine.findAll({ include: ['order', 'product'] })
      // res.json(display(200, 'List of orderLine returned successfully', instance.length, instance))
   } catch (err) {
      next(err)
   }
}

const getById = async (req, res, next) => {
   try {
      // const instance = await OrderLine.findByPk(req.params.id, { include: ['order', 'product'] })
      // if (!instance) {
      //     return next(display(404, 'OrderLine not found'))
      // }
      // res.json(display(200, 'OrderLine returned successfully', instance && 1, instance))
   } catch (err) {
      next(err)
   }
}

const create = async (req, res, next) => {
   try {
      // const instance = await Order.findByPk(req.body.orderId)
      // if (!instance) {
      //     return next(display(400, 'Order not exist'))
      // }
      // const instance2 = await Product.findByPk(req.body.productId)
      // if (!instance2) {
      //     return next(display(400, 'Product not exist'))
      // }
      // const newInstance = await OrderLine.create({
      //     orderId: req.body.orderId,
      //     productId: req.body.productId,
      //     quantity: req.body.quantity,
      // })
      // res.json(display(200, 'OrderLine created successfully', newInstance && 1, newInstance))
   } catch (err) {
      next(err)
   }
}

module.exports = { getAll, getById, create }
