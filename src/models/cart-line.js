const { DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Cart = require('./cart')
const Product = require('./product')

const CartLine = sequelize.define(
   'CartLine',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      cartId: {
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
      price: {
         type: DataTypes.DECIMAL,
         allowNull: false,
      },
   },
   {
      tableName: 'CartLine',
      timestamps: true,
      paranoid: false, // enable soft delete
      underscored: true,
   },
)

CartLine.belongsTo(Cart, {
   as: 'cart',
   foreignKey: 'cartId',
})

CartLine.belongsTo(Product, {
   as: 'product',
   foreignKey: 'productId',
})

module.exports = CartLine
