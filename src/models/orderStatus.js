const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const OrderStatus = sequelize.define('OrderStatus', {
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
    tableName: 'OrderStatus',
    timestamps: true,
    underscored: true,
})

module.exports = OrderStatus