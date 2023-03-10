const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const OrderStatus = require('~/models/order-status')
const Customer = require('~/models/customer')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
    status_id: {
        type: DataTypes.INTEGER,
    },
})

Order.belongsTo(Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

Customer.hasMany(Order, {
    foreignKey: 'customer_id',
    as: 'orders',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

Order.belongsTo(OrderStatus, {
    foreignKey: 'status_id',
    as: 'status',
})

OrderStatus.hasMany(Order, {
    foreignKey: 'status_id',
    as: 'orders',
})

module.exports = Order
