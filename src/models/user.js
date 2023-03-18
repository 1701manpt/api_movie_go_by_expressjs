const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Role = require('./role')
const UserStatus = require('./user-status')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    },
)

User.addScope('excludePassword', {
    attributes: {
        exclude: ['password'],
    },
})

User.addScope('includeStatus', {
    include: 'status',
})

User.addScope('includeRole', {
    include: 'role',
})

User.addScope('includeCustomer', {
    include: 'customer',
})

User.belongsTo(UserStatus, {
    foreignKey: 'status_id',
    as: 'status',
})

UserStatus.hasMany(User, {
    foreignKey: 'status_id',
    as: 'users',
})

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
})

Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
})

module.exports = User
