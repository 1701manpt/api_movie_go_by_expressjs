const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const User = require('~/models/user')

const Admin = sequelize.define(
    'Admin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
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

Admin.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
})

User.hasOne(Admin, {
    foreignKey: 'user_id',
    as: 'admin',
})

module.exports = Admin
