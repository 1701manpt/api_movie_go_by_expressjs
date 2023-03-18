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

    // search by field `name`
    if (query.name) {
        const names = query.name.split(' ')
        const searchName = {
            [Op.or]: names.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.name = searchName
    }

    // search by field `description`
    if (query.description) {
        const descriptions = query.description.split(' ')
        const searchDescription = {
            [Op.and]: descriptions.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.description = searchDescription
    }

    // search by field `price`
    if (query.min_duration && query.max_duration) {
        const searchDuration = {
            [Op.between]: [query.min_duration, query.max_duration],
        }
        option.duration = searchDuration
    }

    if (query.min_duration && !query.max_duration) {
        const search = {
            [Op.gt]: Number(query.min_duration),
        }
        option.duration = search
    }

    if (!query.min_duration && query.max_duration) {
        const search = {
            [Op.lt]: Number(query.max_duration),
        }
        option.duration = search
    }

    // search by field `genre`
    if (query.genre) {
        const genres = query.genre.split(',' || ' ')
        const searchGenre = {
            [Op.or]: genres.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.genre = searchGenre
    }

    return option
}

module.exports = search
