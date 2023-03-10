const { DataTypes } = require('sequelize')
const sequelize = require('~/connection')
const Customer = require('./customer')

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
})

Cart.belongsTo(Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

Customer.hasMany(Cart, {
    foreignKey: 'customer_id',
    as: 'carts',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

module.exports = Cart
