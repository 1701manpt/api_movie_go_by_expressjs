require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require('path')

// models
const Customer = require('../models/customer')
const Employee = require('../models/employee')
const User = require('../models/user')

// utils
const display = require('../utils/display')
const {
   generateToken,
   generateRefreshToken,
   generateTokenRegister,
} = require('../utils/generate-token')
const { hashPassword, comparePassword } = require('../utils/password')

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
         return res.status(400).json(
            display({
               message: 'Tài khoản không tồn tại',
            }),
         )
      }

      const isPassword = await comparePassword(req.body.password, customer.user.password)

      if (customer && !isPassword) {
         return res.status(400).json(
            display({
               message: 'Mật khẩu không khớp',
            }),
         )
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

      res.status(200).json(
         display({
            message: 'Đăng nhập thành công',
            data: {
               id: customer.user.id,
               token: token,
            },
         }),
      )
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
         return res.status(400).json(
            display({
               message: 'Tài khoản không tồn tại',
            }),
         )
      }

      const isPassword = await comparePassword(req.body.password, admin.user.password)

      if (admin && !isPassword) {
         return res.status(400).json(
            display({
               message: 'Mật khẩu không khớp',
            }),
         )
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

      res.status(200).json(
         display({
            message: 'Đăng nhập thành công',
            data: {
               id: admin.user.id,
               roleId: admin.roleId,
               token: token,
            },
         }),
      )
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
         return res.status(400).json(
            display({
               message: 'Tài khoản tồn tại',
            }),
         )
      }

      // cần bổ sung
      // kiểm tra email đã sử dụng

      const password = await hashPassword(req.body.password)

      console.log(password)

      const newCustomer = await Customer.create(
         {
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            user: {
               email: req.body.email,
               account: req.body.account,
               password: password,
               userStatusId: 1,
            },
         },
         {
            include: {
               association: 'user',
            },
         },
      )

      const confirmationCode = generateTokenRegister({
         id: newCustomer.user.id,
      })

      res.status(200).json(
         display({
            message: 'Đăng ký thành công',
            data: newCustomer,
         }),
      )

      req.user.confirmationCode = confirmationCode
      return next() // go to sendMail
   } catch (error) {
      next(error)
   }
}

const verifyRegister = (req, res, next) => {
   try {
      const confirmationCode = req.params.confirmationCode

      jwt.verify(confirmationCode, process.env.REGISTER_TOKEN_SECRET, async (err, user) => {
         if (err) {
            return res
               .status(400)
               .sendFile(path.join(__dirname + '/../pages/verifyRegister/verifyError.html'))
         }

         await User.update(
            {
               userStatusId: 2,
            },
            {
               where: { id: user.id },
            },
         )

         res.status(200).sendFile(
            path.join(__dirname + '/../pages/verifyRegister/verifySuccess.html'),
         )
      })
   } catch (error) {
      next(error)
   }
}

const requestRefreshToken = (req, res, next) => {
   const refreshToken = req.cookies.refreshToken

   if (!refreshToken) {
      return res.status(401).json(
         display({
            message: 'Đăng nhập để tiếp tục',
         }),
      )
   }

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
         return res.status(403).json(
            display({
               message: 'Phiên đăng nhập hết hạn',
            }),
         )
      }

      const newAccessToken = generateToken({
         id: user.id,
         roleId: user.roleId,
      })
      const newRefreshToken = generateRefreshToken({
         id: user.id,
         roleId: user.roleId,
      })

      res.cookie('refreshToken', newRefreshToken, {
         httpOnly: true,
         secure: false,
         path: '/',
         sameSite: 'strict',
      })

      return res.status(200).json(
         display({
            message: 'Làm mới token thành công',
            data: {
               token: newAccessToken,
            },
         }),
      )
   })
}

const logout = (req, res) => {
   res.clearCookie('refreshToken')
   res.status(200).json(
      display({
         message: 'Đăng xuất thành công',
      }),
   )
}

module.exports = {
   requestRefreshToken,
   login,
   loginAdmin,
   register,
   logout,
   verifyRegister,
}
