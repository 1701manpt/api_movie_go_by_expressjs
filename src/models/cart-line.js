const { DataTypes } = require('sequelize')
const sequelize = require('~/connection')

const Cart = require('~/models/cart')
const Product = require('~/models/product')

const CartLine = sequelize.define('CartLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cart_id: {
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

CartLine.addScope('includeCart', {
    include: 'cart'
})

CartLine.addScope('includeProduct', {
    include: 'product'
})

CartLine.belongsTo(Cart, {
    foreignKey: 'cart_id',
    as: 'cart',
})

Cart.hasMany(CartLine, {
    foreignKey: 'cart_id',
    as: 'cart_lines',
})

CartLine.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
})

Product.hasMany(CartLine, {
    foreignKey: 'product_id',
    as: 'cart_lines',
})

module.exports = CartLine
