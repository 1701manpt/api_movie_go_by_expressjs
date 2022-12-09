'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const OrderStatus = require('./orderStatus')
const Customer = require('./customer')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    orderStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Order',
    timestamps: true,
    paranoid: true, // enable soft delete
})

Order.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
})

Order.belongsTo(OrderStatus, {
    foreignKey: 'orderStatusId',
    as: 'orderStatus',
})

module.exports = Order