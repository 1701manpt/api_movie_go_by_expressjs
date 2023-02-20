const { DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../connection')

const Product = require('./product')

const ProductImage = sequelize.define(
   'ProductImage',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      path: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      productId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      tableName: 'ProductImage',
      paranoid: false,
      underscored: true,
   },
)

ProductImage.beforeBulkCreate(async (images, options) => {
   for (let image of images) {
      const count = await ProductImage.count({
         where: { productId: image.productId },
      })
      if (count >= 8) {
         throw new Sequelize.ValidationError('Maximum image count exceeded')
      }
   }
})

ProductImage.belongsTo(Product, {
   as: 'product',
   foreignKey: 'productId',
})

module.exports = ProductImage
