const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
})

Role.addScope('includeUsers', {
    include: 'users',
})

module.exports = Role
