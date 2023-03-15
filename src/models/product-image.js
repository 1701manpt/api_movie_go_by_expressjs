const { DataTypes, Sequelize } = require('sequelize')

const sequelize = require('~/connection')

const Product = require('~/models/product')

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

ProductImage.beforeBulkCreate(async images => {
    for (const image of images) {
        const count = await ProductImage.count({
            where: { product_id: image.product_id },
        })
        if (count >= 8) {
            throw new Sequelize.ValidationError('Maximum image count exceeded')
        }
    }
})

ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
})

Product.hasMany(ProductImage, {
    foreignKey: 'product_id',
    as: 'images',
})

module.exports = ProductImage
