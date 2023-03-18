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

    // search by field `show_time_id`
    if (query.show_time_ids) {
        const array = String(query.show_time_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.show_time_id = search
    }

    // search by field `seat_id`
    if (query.seat_ids) {
        const seats = String(query.seat_ids).split(',')
        const searchSeatId = {
            [Op.in]: seats,
        }
        option.seat_id = searchSeatId
    }

    // search by field `order_id`
    if (query.order_ids) {
        const orders = String(query.order_ids).split(',')
        const searchOrderId = {
            [Op.in]: orders,
        }
        option.order_id = searchOrderId
    }

    return option
}

module.exports = search
