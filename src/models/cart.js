const { DataTypes } = require('sequelize')
const sequelize = require('~/connection')

const Product = require('./product')

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
})

Cart.belongsTo(Product, { foreignKey: 'product_id' })

module.exports = Cart
