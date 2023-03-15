const { Op } = require('sequelize')
const camelCase = require('~/utils/camel-case')

const searchOrder = search => {
    const option = {}

    const query = camelCase(search)

    // search by field `id`
    if (query.ids) {
        const array = query.ids.split(',')
        const search = {
            [Op.in]: array,
        }
        option.id = search
    }

    // search by field `customer_id`
    if (query.customerIds) {
        const array = query.customerIds.split(',')
        const search = {
            [Op.in]: array,
        }
        option.customer_id = search
    }

    // search by field `status_id`
    if (query.statusIds) {
        const array = query.statusIds.split(',')
        const search = {
            [Op.in]: array,
        }
        option.status_id = search
    }

    return option
}

module.exports = searchOrder
