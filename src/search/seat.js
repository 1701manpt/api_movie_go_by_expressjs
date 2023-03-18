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

    // search by field `text`, `number`
    if (query.rows) {
        const rs = query.rows.split(',')
        const searchText = {
            [Op.or]: rs.map(term => ({
                [Op.eq]: `${term}`,
            })),
        }
        option.text = searchText
    }

    if (query.columns) {
        const cs = query.columns.split(',')
        const searchNumber = {
            [Op.or]: cs.map(term => ({
                [Op.eq]: Number(term),
            })),
        }
        option.number = searchNumber
    }

    return option
}

module.exports = search
