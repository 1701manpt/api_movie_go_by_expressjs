const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const Product = require('./Product')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'Category',
    timestamps: true,
    paranoid: false,
    underscored: true,
})

// Category.hasMany(Product, {
//     as: 'products',
//     foreignKey: 'categoryId',
// })

module.exports = Category