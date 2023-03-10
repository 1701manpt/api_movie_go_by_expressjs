const { DataTypes } = require('sequelize')

const sequelize = require('~/connection')
const Movie = require('~/models/movie')
const Threater = require('~/models/threater')

const ShowTime = sequelize.define('ShowTime', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    threater_id: {
        type: DataTypes.INTEGER,
    },
    movie_id: {
        type: DataTypes.INTEGER,
    },
    date_time: {
        type: DataTypes.DATE,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
})

ShowTime.belongsTo(Movie, {
    foreignKey: 'movie_id',
    as: 'movie',
})

Movie.hasMany(ShowTime, {
    foreignKey: 'movie_id',
    as: 'show_times',
})

ShowTime.belongsTo(Threater, {
    foreignKey: 'threater_id',
    as: 'threater',
})

Threater.hasMany(ShowTime, {
    foreignKey: 'threater_id',
    as: 'show_times',
})

module.exports = ShowTime
