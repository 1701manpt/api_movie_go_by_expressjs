const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Category = require('./category')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
})

Product.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id',
})

module.exports = Product
