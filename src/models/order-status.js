const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const OrderStatus = sequelize.define(
   'OrderStatus',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: false,
         allowNull: false,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      tableName: 'OrderStatus',
      timestamps: false,
      underscored: true,
   },
)

module.exports = OrderStatus
