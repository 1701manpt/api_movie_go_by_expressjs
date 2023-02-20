const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Category = require('./Category')

const Product = sequelize.define(
   'Product',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      avatar: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      price: {
         type: DataTypes.DECIMAL,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      categoryId: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
   },
   {
      tableName: 'Product',
      timestamps: true,
      paranoid: false, // enable soft delete
      underscored: true,
   },
)

Product.belongsTo(Category, {
   as: 'category',
   foreignKey: 'categoryId',
})

// Category.hasMany(Product, {
//     as: 'products',
//     foreignKey: 'categoryId',
// })

module.exports = Product
