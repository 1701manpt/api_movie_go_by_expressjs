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

    // search by field `role_id`
    if (query.role_ids) {
        const array = String(query.role_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.role_id = search
    }

    // search by field `status_id`
    if (query.status_ids) {
        const array = String(query.status_ids).split(',')
        const search = {
            [Op.in]: array,
        }
        option.status_id = search
    }

    // search by field `account`
    if (query.accounts) {
        const descriptions = query.accounts.split(',')
        const searchDescription = {
            [Op.or]: descriptions.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.account = searchDescription
    }

    // search by field `email`
    if (query.emails) {
        const descriptions = query.emails.split(',')
        const searchDescription = {
            [Op.or]: descriptions.map(term => ({
                [Op.like]: `%${term}%`,
            })),
        }
        option.email = searchDescription
    }

    return option
}

module.exports = search
