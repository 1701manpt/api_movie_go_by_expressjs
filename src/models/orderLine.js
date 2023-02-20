'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Order = require('./order')
const Product = require('./Product')

const OrderLine = sequelize.define(
   'OrderLine',
   {
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
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 1,
      },
   },
   {
      tableName: 'OrderLine',
      timestamps: true,
      paranoid: true, // enable soft delete
      underscored: true,
   },
)

OrderLine.belongsTo(Order, {
   as: 'order',
   foreignKey: 'orderId',
})

OrderLine.belongsTo(Product, {
   as: 'product',
   foreignKey: 'productId',
})

module.exports = OrderLine
