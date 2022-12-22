const sequelize = require('../connection')

// models
const AccountStatus = require('../models/UserStatus')
const OrderStatus = require('../models/orderStatus')

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

    await sequelize.sync({ force: true })

    accountStatusArray.forEach(async (e) => {
        await AccountStatus.create(e)
    })
    orderStatusArray.forEach(async (e) => {
        await OrderStatus.create(e)
    })
}

module.exports = auto