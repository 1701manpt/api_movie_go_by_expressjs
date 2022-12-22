const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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

module.exports = Employee