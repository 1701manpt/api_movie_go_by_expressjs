'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Order = require('./order')
const Product = require('./product')

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // productPrice: {
    //     type: DataTypes.DECIMAL,
    //     allowNull: false,
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    // amount: {
    //     type: DataTypes.DECIMAL,
    //     allowNull: false,
    // }
}, {
    tableName: 'OrderLine',
    timestamps: true,
    paranoid: true, // enable soft delete
})

OrderLine.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
})

OrderLine.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
})

module.exports = OrderLine