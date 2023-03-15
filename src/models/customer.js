const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const User = require('~/models/user')

const Customer = sequelize.define(
    'Customer',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        paranoid: true,
    },
)

Customer.addScope('includeOrders', {
    include: ['orders'],
})

Customer.addScope('includeUser', {
    include: {
        as: 'user',
        model: User,
        attributes: {
            exclude: ['password'],
        },
    },
})

Customer.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
})

User.hasOne(Customer, {
    foreignKey: 'user_id',
    as: 'customer',
})

module.exports = Customer
