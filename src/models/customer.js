const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const User = require('./User')

const Customer = sequelize.define(
   'Customer',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      fullName: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      phone: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      address: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
   },
   {
      tableName: 'Customer',
      timestamps: true,
      paranoid: true, // enable soft delete
      underscored: true,
   },
)

Customer.belongsTo(User, {
   as: 'user',
   foreignKey: 'userId',
})

module.exports = Customer
