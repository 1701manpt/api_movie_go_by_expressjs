const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Order = require('~/models/order')
const Seat = require('~/models/seat')

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    show_time_id: {
        type: DataTypes.INTEGER,
    },
    seat_id: {
        type: DataTypes.INTEGER,
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
})

Ticket.belongsTo(Seat, {
    as: 'seat',
    foreignKey: 'seat_id',
})

Ticket.belongsTo(Order, {
    as: 'order',
    foreignKey: 'order_id',
})

module.exports = Ticket
