const sequelize = require('~/connection')
const OrderStatus = require('~/models/order-status')
const Role = require('~/models/role')
const UserStatus = require('~/models/user-status')
const insertMovie = require('~/tools/insert-movies')

const delDataAndSyncModel = async () => {
    // Đồng bộ hóa database với Sequelize
    await sequelize.sync({ force: true })

    const insertOrderStatus = () => {
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

        orderStatusArray.forEach(async e => {
            await OrderStatus.create(e)
        })
    }

    const insertAccountStatus = () => {
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

        accountStatusArray.forEach(async e => {
            await UserStatus.create(e)
        })
    }

    const insertRole = () => {
        const roleArray = [
            {
                id: 1,
                name: 'Administrator',
            },
        ]

        roleArray.forEach(async e => {
            await Role.create(e)
        })
    }

    insertOrderStatus()
    insertAccountStatus()
    insertRole()

    insertMovie()
}

module.exports = delDataAndSyncModel
