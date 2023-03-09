const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Role = require('./role')
const UserStatus = require('./user-status')

const Employee = sequelize.define(
    'Employee',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        account: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        paranoid: true,
    },
)

Employee.belongsTo(Role, {
    as: 'role',
    foreignKey: 'role_id',
})

Employee.belongsTo(UserStatus, {
    as: 'user_status',
    foreignKey: 'status_id',
})

module.exports = Employee
