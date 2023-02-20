// modal
const OrderStatus = require('../models/orderStatus')
// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
   try {
      const list = await OrderStatus.findAll()

      res.status(200).json(
         display({
            message: 'Lấy danh sách trạng thái đơn hàng thành công',
            data: list,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {
   try {
      const orderStatus = await OrderStatus.findByPk(req.params.id)
      if (!orderStatus) {
         return res.status(400).json(
            display({
               message: 'Trạng thái đơn hàng không tồn tại',
            }),
         )
      }

      res.status(200).json(
         display({
            message: 'Lấy trạng thái đơn hàng thành công',
            data: orderStatus,
         }),
      )
   } catch (error) {
      next(error)
   }
}

module.exports = { getAll, getById }
