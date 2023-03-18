const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Category = require('~/models/category')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
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

Product.addScope('includeCategory', {
    include: 'category',
})

Product.addScope('includeOrderLines', {
    include: 'order_lines',
})

Product.addScope('includeCartLines', {
    include: 'cart_lines',
})

Product.addScope('includeImages', {
    include: 'images',
})

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
})

Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products',
})

module.exports = Product
