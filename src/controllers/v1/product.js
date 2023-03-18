const Category = require('~/models/category')
const Product = require('~/models/product')
const search = require('~/searchs/product')
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

        const { count, rows } = await Product.scope(['includeCategory']).findAndCountAll({
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
        const product = await Product.findByPk(req.params.id, {
            include: ['category', 'images'],
        })
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: product,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        if (req.body.category_id) {
            const category = await Category.findOne({
                where: { id: req.body.category_id },
            })
            if (!category) {
                return res.status(400).json({
                    status: 400,
                    message: 'Danh mục không tồn tại',
                })
            }
        }

        const newProduct = await Product.create({
            avatar: req.body?.avatar,
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            category_id: req.body?.category_id,
        })

        res.status(200).json({
            status: 200,
            data: newProduct,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const newProduct = await Product.update(
            {
                name: req.body?.name,
                price: req.body?.price,
                description: req.body?.description,
                category_id: req.body?.category_id,
                avatar_url: req.body?.avatar_url,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newProduct[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const count = await Product.destroy({
            where: { id: req.params.id },
            returning: true,
        })

        res.status(200).json({
            status: 200,
            count,
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
}
