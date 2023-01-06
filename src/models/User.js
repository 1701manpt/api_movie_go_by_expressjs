'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const UserStatus = require('./UserStatus')
const Role = require('./Role')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: true,
    paranoid: true, // enable soft delete
    underscored: true,
})

User.belongsTo(UserStatus, {
    as: 'userStatus',
    foreignKey: 'userStatusId',
})

module.exports = User