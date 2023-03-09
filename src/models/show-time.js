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
    as: 'movie',
    foreignKey: 'movie_id',
})

ShowTime.belongsTo(Threater, {
    as: 'threater',
    foreignKey: 'theater_id',
})

module.exports = ShowTime
