'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const OrderStatus = sequelize.define('OrderStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'OrderStatus',
    timestamps: true,
    paranoid: true, // enable soft delete
})

module.exports = OrderStatus