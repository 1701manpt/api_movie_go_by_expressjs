const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Order = require('./order')
const Product = require('./product')

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
})

OrderLine.belongsTo(Order, {
    as: 'order',
    foreignKey: 'order_id',
})

OrderLine.belongsTo(Product, {
    as: 'product',
    foreignKey: 'product_id',
})

module.exports = OrderLine
