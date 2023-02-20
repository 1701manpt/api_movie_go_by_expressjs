const Customer = require('../../models/customer')

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
            message: 'Tên tài khoản hoặc mật khẩu không đúng',
         })
      }

      if (customer && !toCheck(req.body.password, customer.user.password)) {
         return res.status(401).json({
            status: 401,
            message: 'Tên tài khoản hoặc mật khẩu không đúng',
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
         message: 'Đăng nhập thành công',
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { login }
