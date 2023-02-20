const User = require('../models/User')
const display = require('../utils/display')

const getAll = async (req, res, next) => {
   try {
      const list = await User.findAll({
         include: 'userStatus',
      })

      res.status(200).json(
         display({
            message: 'Lấy danh sách người dùng thành công',
            data: list,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {}

module.exports = { getAll, getById }
