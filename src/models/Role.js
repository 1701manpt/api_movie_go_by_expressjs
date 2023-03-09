const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: DataTypes.STRING,
    },
})

module.exports = Role
