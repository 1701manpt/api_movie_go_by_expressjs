const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Category.addScope('includeProducts', {
    include: 'products',
})

module.exports = Category
