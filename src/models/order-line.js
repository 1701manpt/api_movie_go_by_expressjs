const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Order = require('~/models/order')
const Product = require('~/models/product')

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
})

OrderLine.addScope('includeOrder', {
    include: 'order',
})

OrderLine.addScope('includeProduct', {
    include: 'product',
})

OrderLine.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order',
})

Order.hasMany(OrderLine, {
    foreignKey: 'order_id',
    as: 'order_lines',
})

OrderLine.belongsTo(Product, {
    as: 'product',
    foreignKey: 'product_id',
})

Product.hasMany(OrderLine, {
    foreignKey: 'product_id',
    as: 'order_lines',
})

module.exports = OrderLine
