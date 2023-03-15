const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Threater = require('~/models/threater')

const Seat = sequelize.define('Seat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    threater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

Seat.belongsTo(Threater, {
    foreignKey: 'threater_id',
    as: 'threater',
})

Threater.hasMany(Seat, {
    foreignKey: 'threater_id',
    as: 'seats',
})

module.exports = Seat
