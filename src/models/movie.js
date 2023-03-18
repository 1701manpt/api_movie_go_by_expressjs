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
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    poster_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trailer_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Movie.addScope('includeShowTimes', {
    include: ['show_times'],
})

module.exports = Movie
