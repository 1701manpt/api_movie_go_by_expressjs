const User = require('../../models/User')

const getAll = async (req, res, next) => {
   try {
      const list = await User.findAll({
         include: 'userStatus',
      })

      res.status(200).json({
         status: 200,
         data: list,
      })
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {}

module.exports = { getAll, getById }
