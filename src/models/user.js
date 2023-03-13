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
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        status_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        paranoid: true,
    },
)

User.addScope('excludePassword', {
    attributes: {
        exclude: ['password']
    }
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
