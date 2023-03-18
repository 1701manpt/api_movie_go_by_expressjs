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

    // search by field `customer_id`
    if (query.customer_ids) {
        const array = String(query.customer_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.customer_id = search
    }

    // search by field `status_id`
    if (query.status_ids) {
        const array = String(query.status_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.status_id = search
    }

    return option
}

module.exports = search
