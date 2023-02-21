const Customer = require('../../models/customer')
const Employee = require('../../models/employee')
const User = require('../../models/user')
const { generateToken, generateRefreshToken } = require('../../utils/generate-token')
const { hashPassword, comparePassword } = require('../../utils/password')

const login = async (req, res, next) => {
   try {
      const customer = await Customer.findOne({
         include: {
            association: 'user',
            where: {
               account: req.body.account,
            },
         },
      })

      if (!customer) {
         return res.status(401).json({
            status: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
         })
      }

      const isPassword = await comparePassword(req.body.password, customer.user.password)

      if (customer && !isPassword) {
         return res.status(401).json({
            status: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
         })
      }

      const token = generateToken({
         id: customer.user.id,
      })
      const refreshToken = generateRefreshToken({
         id: customer.user.id,
      })

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: false,
         path: '/',
         sameSite: 'strict',
      })

      res.status(200).json({
         status: 200,
         user: {
            id: customer.user.id,
            token: token,
         },
      })
   } catch (error) {
      next(error)
   }
}

const loginAdmin = async (req, res, next) => {
   try {
      const admin = await Employee.findOne({
         include: [
            {
               association: 'user',
               where: {
                  account: req.body.account,
               },
            },
         ],
      })

      if (!admin) {
         return res.status(401).json({
            status: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
         })
      }
      const isPassword = await comparePassword(req.body.password, admin.user.password)

      if (admin && !isPassword) {
         return res.status(401).json({
            status: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
         })
      }

      const token = generateToken({
         id: admin.user.id,
         roleId: admin.roleId,
      })
      const refreshToken = generateRefreshToken({
         id: admin.user.id,
         roleId: admin.roleId,
      })

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: false,
         path: '/',
         sameSite: 'strict',
      })

      res.status(200).json({
         status: 200,
         data: {
            id: admin.user.id,
            roleId: admin.roleId,
            token: token,
         },
      })
   } catch (error) {
      next(error)
   }
}

const register = async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            account: req.body.account,
         },
         paranoid: false,
      })

      if (user) {
         return res.status(400).json({
            status: 400,
            message: 'Tên tài khoản đã tồn tại',
         })
      }

      const password = await hashPassword(req.body.password)

      const customer = await Customer.create(
         {
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            user: {
               email: req.body.email,
               account: req.body.account,
               password: password,
               userStatusId: 2,
            },
         },
         {
            include: {
               association: 'user',
            },
         },
      )

      res.status(200).json({
         status: 200,
         data: customer,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { login, loginAdmin, register }
