const { DataTypes } = require('sequelize')

const sequelize = require('../connection')
const Role = require('./Role')

const User = require('./User')

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'Employee',
    timestamps: true,
    paranoid: true, // enable soft delete
    underscored: true,
})

Employee.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
})

Employee.belongsTo(Role, {
    as: 'role',
    foreignKey: 'roleId',
})

module.exports = Employee