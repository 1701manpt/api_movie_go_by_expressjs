const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Threater = sequelize.define('Threater', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Threater.addScope('includeSeats', {
    include: ['seats'],
})

Threater.addScope('includeShowTimes', {
    include: ['show_times'],
})

module.exports = Threater
