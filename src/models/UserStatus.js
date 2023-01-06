const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const UserStatus = sequelize.define('UserStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'UserStatus',
    timestamps: false,
    paranoid: false,
    underscored: true,
})

module.exports = UserStatus