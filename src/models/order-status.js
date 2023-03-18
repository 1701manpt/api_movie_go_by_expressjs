const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const OrderStatus = sequelize.define('OrderStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

OrderStatus.addScope('includeOrders', {
    include: 'orders',
})

module.exports = OrderStatus
