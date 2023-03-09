const sequelize = require('~/connection')
const Threater = require('~/models/threater')
const Ticket = require('~/models/ticket')
const Seat = require('~/models/seat')
const ShowTime = require('~/models/show-time')
const CartLine = require('~/models/cart-line')
const OrderLine = require('~/models/order-line')
const OrderStatus = require('~/models/order-status')
const UserStatus = require('~/models/user-status')

const delDataAndSyncModel = async () => {
    // Đồng bộ hóa database với Sequelize
    await sequelize.sync({ force: true })
}

module.exports = delDataAndSyncModel
