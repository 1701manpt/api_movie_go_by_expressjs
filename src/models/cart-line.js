const { DataTypes } = require('sequelize')
const sequelize = require('~/connection')

const Cart = require('./cart')
const Product = require('./product')

const CartLine = sequelize.define('CartLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cart_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
})

CartLine.belongsTo(Cart, {
    as: 'cart',
    foreignKey: 'cart_id',
})

CartLine.belongsTo(Product, {
    as: 'product',
    foreignKey: 'product_id',
})

module.exports = CartLine
