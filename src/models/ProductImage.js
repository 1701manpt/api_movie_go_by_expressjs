const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Product = require('./product')

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'ProductImage',
    timestamps: true,
    underscored: true,
})

ProductImage.belongsTo(Product, {
    as: 'product',
    foreignKey: 'productId',
})

module.exports = ProductImage