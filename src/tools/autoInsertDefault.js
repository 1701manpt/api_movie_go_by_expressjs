const sequelize = require('../connection')

// models
const AccountStatus = require('../models/accountStatus')
const OrderStatus = require('../models/orderStatus')

const auto = async () => {
    const orderStatusArray = [
        {
            code: 1,
            name: 'Chờ xác nhận',
        },
        {
            code: 2,
            name: 'Chờ lấy hàng',
        },
        {
            code: 3,
            name: 'Đang giao hàng',
        },
        {
            code: 4,
            name: 'Đã nhận',
        },
        {
            code: 5,
            name: 'Đã hủy',
        },
        {
            code: 6,
            name: 'Trả hàng',
        },
    ]

    const accountStatusArray = [
        {
            code: 1,
            name: 'Chưa xác thực',
        },
        {
            code: 2,
            name: 'Đã xác thực',
        },
        {
            code: 3,
            name: 'Tạm xóa',
        },
        {
            code: 4,
            name: 'Khóa',
        },
    ]

    await sequelize.sync({ force: true })

    accountStatusArray.forEach(async (e) => {
        await AccountStatus.create(e)
    })
    orderStatusArray.forEach(async (e) => {
        await OrderStatus.create(e)
    })

}

module.exports = auto