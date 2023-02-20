// modal
const OrderStatus = require('../../models/orderStatus')

const getAll = async (req, res, next) => {
   try {
      const list = await OrderStatus.findAll()

      res.status(200).json({
         status: 200,
         data: list,
      })
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {
   try {
      const orderStatus = await OrderStatus.findByPk(req.params.id)
      if (!orderStatus) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      res.status(200).json({
         status: 200,
         data: orderStatus,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { getAll, getById }
