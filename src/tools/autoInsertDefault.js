const sequelize = require('../connection')

// models
const UserStatus = require('../models/user-status')
const OrderStatus = require('../models/order-status')
const Role = require('../models/role')
const Employee = require('../models/employee')
const { hashPassword } = require('../utils/password')

const auto = async () => {
   const orderStatusArray = [
      {
         id: 1,
         name: 'Chờ xác nhận',
      },
      {
         id: 2,
         name: 'Chờ lấy hàng',
      },
      {
         id: 3,
         name: 'Đang giao hàng',
      },
      {
         id: 4,
         name: 'Đã nhận',
      },
      {
         id: 5,
         name: 'Đã hủy',
      },
      {
         id: 6,
         name: 'Trả hàng',
      },
   ]

   const accountStatusArray = [
      {
         id: 1,
         name: 'Chưa xác thực',
      },
      {
         id: 2,
         name: 'Đã xác thực',
      },
      {
         id: 3,
         name: 'Tạm xóa',
      },
      {
         id: 4,
         name: 'Khóa',
      },
   ]

   const roleArray = [
      {
         id: 1,
         name: 'Administrator',
      },
   ]

   // Đồng bộ hóa database với Sequelize
   await sequelize.sync({ force: true })

   accountStatusArray.forEach(async e => {
      await UserStatus.create(e)
   })
   orderStatusArray.forEach(async e => {
      await OrderStatus.create(e)
   })
   roleArray.forEach(async e => {
      await Role.create(e)
   })

   const password = await hashPassword('admin')

   await Employee.create(
      {
         fullName: 'Thái Phương Nam',
         address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
         phone: '0337948940',
         user: {
            email: 'thaiphuongnam1071@gmail.com',
            account: 'admin',
            password: password,
            userStatusId: 2,
         },
         roleId: 1,
      },
      {
         include: {
            association: 'user',
         },
      },
   )
}

module.exports = auto
