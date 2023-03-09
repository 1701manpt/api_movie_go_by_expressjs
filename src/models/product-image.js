const { DataTypes, Sequelize } = require('sequelize')

const sequelize = require('~/connection')

const Product = require('./product')

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.TEXT,
    },
    product_id: {
        type: DataTypes.INTEGER,
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
    as: 'product',
    foreignKey: 'product_id',
})

module.exports = ProductImage
