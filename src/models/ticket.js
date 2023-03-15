const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Order = require('~/models/order')
const ShowTime = require('~/models/show-time')
const Seat = require('~/models/seat')

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    show_time_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

Ticket.addScope('includeSeat', {
    include: 'seat',
})

Ticket.addScope('includeShowTime', {
    include: 'show_time',
})

Ticket.addScope('includeOrder', {
    include: 'order',
})

Ticket.belongsTo(ShowTime, {
    foreignKey: 'show_time_id',
    as: 'show_time',
})

ShowTime.hasMany(Ticket, {
    foreignKey: 'show_time_id',
    as: 'tickets',
})

Ticket.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order',
})

Order.hasMany(Ticket, {
    foreignKey: 'order_id',
    as: 'tickets',
})

Ticket.belongsTo(Seat, {
    foreignKey: 'seat_id',
    as: 'seat',
})

Seat.hasMany(Ticket, {
    foreignKey: 'seat_id',
    as: 'tickets',
})

module.exports = Ticket
