'use strict'

const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const AccountStatus = require('./accountStatus')

const Customer = sequelize.define('Customer', {
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
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountStatusId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}, {
    tableName: 'Customer',
    timestamps: true,
    paranoid: true, // enable soft delete
})

Customer.belongsTo(AccountStatus, {
    as: 'accountStatus',
    foreignKey: 'accountStatusId',
})

module.exports = Customer