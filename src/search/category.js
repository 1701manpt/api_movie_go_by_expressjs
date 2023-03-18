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

    return option
}

module.exports = search
