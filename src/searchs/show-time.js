const { Op } = require('sequelize')

const search = search => {
    const option = {}

    const query = search

    // search by field `id`
    if (query.ids) {
        const array = String(query.ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.id = search
    }

    // search by field `threater_id`
    if (query.threater_ids) {
        const threaters = String(query.threater_ids).split(',')
        const searchThreaterId = {
            [Op.in]: threaters,
        }
        option.threater_id = searchThreaterId
    }

    // search by field `movie_id`
    if (query.movie_ids) {
        const array = String(query.movie_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.movie_id = search
    }

    // search by field `price`
    if (query.min_price && query.max_price) {
        const search = {
            [Op.between]: [query.min_price, query.max_price],
        }
        option.price = search
    }

    if (query.min_price && !query.max_price) {
        const search = {
            [Op.gt]: Number(query.min_price),
        }
        option.price = search
    }

    if (!query.min_price && query.max_price) {
        const search = {
            [Op.lt]: Number(query.max_price),
        }
        option.price = search
    }

    // search by field `date_time`
    if (query.min_date_time && query.max_date_time) {
        const searchDateTime = {
            [Op.between]: [query.min_date_time, query.max_date_time],
        }
        option.date_time = searchDateTime
    }

    return option
}

module.exports = search
