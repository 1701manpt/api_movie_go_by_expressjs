'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const AccountStatus = sequelize.define('AccountStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'AccountStatus',
    timestamps: true,
    paranoid: true, // enable soft delete
})

module.exports = AccountStatus