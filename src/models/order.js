const { DataTypes } = require('sequelize')

const sequelize = require('../connection')

const OrderStatus = require('./OrderStatus')
const Customer = require('./customer')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    orderStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Order',
    timestamps: true,
    paranoid: true, // enable soft delete
    underscored: true,
})

Order.belongsTo(Customer, {
    as: 'customer',
    foreignKey: 'customerId',
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
})

Order.belongsTo(OrderStatus, {
    as: 'orderStatus',
    foreignKey: 'orderStatusId',
})

module.exports = Order