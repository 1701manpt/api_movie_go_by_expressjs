const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const OrderStatus = require('./order-status')
const Customer = require('./customer')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status_id: {
        type: DataTypes.INTEGER,
    },
})

Order.belongsTo(Customer, {
    as: 'customer',
    foreignKey: 'customer_id',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

Order.belongsTo(OrderStatus, {
    as: 'order_status',
    foreignKey: 'status_id',
})

module.exports = Order
