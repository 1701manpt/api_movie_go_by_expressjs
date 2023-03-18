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
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
})

UserStatus.addScope('includeUsers', {
    include: 'users',
})

module.exports = UserStatus
