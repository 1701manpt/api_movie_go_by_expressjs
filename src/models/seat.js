const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Threater = require('./threater')

const Seat = sequelize.define('Seat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    threater_id: {
        type: DataTypes.INTEGER,
    },
    text: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.INTEGER,
    }
})

Seat.belongsTo(Threater, {
    as: 'threater',
    foreignKey: 'threater_id',
})

module.exports = Seat
