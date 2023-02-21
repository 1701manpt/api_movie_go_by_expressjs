const { DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Product = require('./product')

const Cart = sequelize.define(
   'Cart',
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      customerId: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
   },
   {
      tableName: 'Cart',
      timestamps: true,
      paranoid: false,
      underscored: true,
   },
)

Cart.belongsTo(Product, { foreignKey: 'productId' })

module.exports = Cart
