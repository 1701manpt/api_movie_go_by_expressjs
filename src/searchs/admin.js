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

    // search by field `full_name`
    if (query.full_name) {
        const names = String(query.full_name).split(' ')
        const searchName = {
            [Op.or]: names.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.full_name = searchName
    }

    // search by field `phone_number`
    if (query.phone_number) {
        const descriptions = String(query.phone_number).split(' ')
        const searchDescription = {
            [Op.or]: descriptions.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.phone_number = searchDescription
    }

    // search by field `address`
    if (query.address) {
        const genres = String(query.address).split(',' || ' ')
        const searchGenre = {
            [Op.or]: genres.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.address = searchGenre
    }

    return option
}

module.exports = search
