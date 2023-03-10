const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Role = require('~/models/role')
const UserStatus = require('~/models/user-status')

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
    foreignKey: 'role_id',
    as: 'role',
})

Role.hasMany(Employee, {
    foreignKey: 'role_id',
    as: 'employees',
})

Employee.belongsTo(UserStatus, {
    foreignKey: 'status_id',
    as: 'status',
})

UserStatus.hasMany(Employee, {
    foreignKey: 'status_id',
    as: 'employees',
})

module.exports = Employee
