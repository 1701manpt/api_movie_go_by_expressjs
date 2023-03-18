const Category = require('~/models/category')
const search = require('~/searchs/category')
const Pagination = require('~/utils/pagination')
const sortBy = require('~/utils/sort-by')

const getAll = async (req, res, next) => {
    try {
        const { query } = req

        // pagination
        const pagination = new Pagination({
            perPage: query.per_page,
            page: query.page,
        })

        // searchs
        const where = search(query)

        // sort by
        const sort = sortBy(query.sort_by)

        const { count, rows } = await Category.scope(['includeProducts']).findAndCountAll({
            where: where,
            limit: pagination.getLimit(),
            offset: pagination.getOffset(),
            order: sort,
        })

        pagination.setCount(count)

        res.status(200).json({
            status: 200,
            ...pagination.getInfor(),
            count: rows.length,
            data: rows,
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: category,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        await Category.findOne({
            where: { name: req.body.name },
        })

        const newCategory = await Category.create({
            name: req.body.name,
            avatar_url: req.body.avatar_url,
        })

        res.status(200).json({
            status: 200,
            data: newCategory,
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const newCategory = await Category.update(
            {
                name: req.body.name,
                avatar_url: req.body.avatar_url,
            },
            {
                where: { id: req.params.id },
                returning: true,
                plain: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newCategory[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Category.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        await Category.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json({
            status: 200,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
}
