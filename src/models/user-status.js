const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const UserStatus = sequelize.define('UserStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: DataTypes.STRING,
    },
})

module.exports = UserStatus