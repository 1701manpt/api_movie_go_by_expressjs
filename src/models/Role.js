const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Role = sequelize.define(
   'Role',
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
      tableName: 'Role',
      timestamps: false,
      paranoid: false,
      underscored: true,
   },
)

module.exports = Role
