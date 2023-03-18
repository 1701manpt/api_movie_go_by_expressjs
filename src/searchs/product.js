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
    if (query.min_price && query.max_price) {
        const searchPrice = {
            [Op.between]: [query.min_price, query.max_price],
        }
        option.price = searchPrice
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

    // search by field `categoryId`
    if (query.category_ids) {
        const categories = String(query.category_ids).split(',')
        const searchCategoryId = {
            [Op.in]: categories,
        }
        option.category_id = searchCategoryId
    }

    return option
}

module.exports = search
