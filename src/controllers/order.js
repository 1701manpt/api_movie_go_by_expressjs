// models
const Order = require('../models/order')
const Customer = require('../models/customer')
const OrderStatus = require('../models/order-status')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
   try {
      const instance = await Order.findAll()

      res.status(200).json(
         display({
            message: 'Lấy danh sách đơn hàng thành công',
            data: instance,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {
   try {
      const instance = await Order.findByPk(req.params.id)
      if (!instance) {
         return res.status(400).json(
            display({
               message: 'Đơn hàng không tồn tại',
            }),
         )
      }

      res.status(200).json(
         display({
            message: 'Lấy đơn hàng thành công',
            data: instance,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const create = async (req, res, next) => {
   try {
      const customer = await Customer.findByPk(req.body.customerId)
      if (!customer) {
         return res.status(400).json(
            display({
               message: 'Khách hàng không tồn tại',
            }),
         )
      }

      const newOrder = await Order.create(
         {
            customerId: req.body.customerId,
            orderStatusId: 1,
         },
         {
            include: 'orderLine',
         },
      )

      res.status(200).json(
         display({
            message: 'Tạo đơn hàng thành công',
            data: newOrder,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const update = async (req, res, next) => {
   try {
      // const instance = await Order.findByPk(req.params.id)
      // if (!instance) {
      //     return next(404, 'Order not found')
      // }
      // const [result, newInstance] = await Order.update({
      //     orderStatusId: req.body.orderStatusId,
      // }, {
      //     where: { id: req.params.id },
      //     returning: true,
      //     plain: true,
      // })
      // res.json(display(200, 'Order updated successfully', !result && 1, newInstance))
   } catch (err) {
      next(err)
   }
}

const destroy = async (req, res, next) => {
   try {
      // const instance = await Order.findByPk(req.params.id)
      // if (!instance) {
      //     return next(display(404, 'Order not found'))
      // }
      // const newInstance = await Order.destroy({
      //     where: { id: req.params.id },
      //     returning: true,
      //     plain: true
      // })
      // res.json(display(200, 'Order deleted successfully', newInstance && 1, newInstance))
   } catch (err) {
      next(err)
   }
}

const destroyForce = async (req, res, next) => {
   try {
      // const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
      // if (!instance) {
      //     return next(display(404, 'Order not found'))
      // } else {
      //     if (instance.deletedAt === null) {
      //         return next(display(400, 'Order must be soft deleted before continue'))
      //     }
      // }
      // const newInstance = await Order.destroy({
      //     where: { id: req.params.id },
      //     returning: true,
      //     plain: true,
      //     force: true // delete record from database
      // })
      // res.json(display(200, 'Order deleted successfully', newInstance))
   } catch (err) {
      next(err)
   }
}

const restore = async (req, res, next) => {
   try {
      // const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
      // if (!instance) {
      //     return next(display(404, 'Order not found'))
      // } else {
      //     if (instance.deletedAt === null) {
      //         return next(display(400, 'Order must be soft deleted before continue'))
      //     }
      // }
      // const newInstance = await Order.restore({
      //     where: { id: req.params.id },
      //     returning: true,
      //     plain: true
      // })
      // res.json(display(200, 'Order restored successfully', newInstance && 1, newInstance))
   } catch (err) {
      next(err)
   }
}

module.exports = {
   getAll,
   getById,
   create,
   update,
   destroy,
   destroyForce,
   restore,
}
