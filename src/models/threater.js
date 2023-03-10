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
    },
})

module.exports = Threater
