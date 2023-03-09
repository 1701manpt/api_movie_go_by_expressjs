const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    poster_url: {
        type: DataTypes.STRING,
    },
    trailer_url: {
        type: DataTypes.STRING,
    },
})

module.exports = Movie
