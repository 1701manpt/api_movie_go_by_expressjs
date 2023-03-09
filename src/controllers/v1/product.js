const { Op } = require('sequelize')
const Category = require('~/models/category')
const Product = require('~/models/product')
const ProductImage = require('~/models/product-image')

const getAll = async (req, res, next) => {
    try {
        const { query } = req
        const option = {}

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

        // search by field `id`
        if (query.id) {
            const searchId = {
                [Op.like]: query.id,
            }
            option.id = searchId
        }

        // search by field `price`
        if (query.min_price && query.max_price) {
            const searchPrice = {
                [Op.between]: [query.min_price, query.max_price],
            }
            option.price = searchPrice
        }

        // search by field `categoryId`
        if (query.categories) {
            const categories = query.categories.split(',')
            const searchCategoryId = {
                [Op.in]: categories,
            }
            option.category_id = searchCategoryId
        }

        // paginate results
        const perPage = query.per_page || 5
        const page = query.page || 1

        // sort by fields
        const sortBy =
            query?.sort_by?.split(',').map(e => {
                if (e.includes('-')) {
                    return [e.slice(1), 'DESC']
                }
                return [e, 'ASC']
            }) || []

        const { count, rows } = await Product.findAndCountAll({
            where: option,
            include: 'category',
            limit: Number(perPage),
            offset: Number(page * perPage - perPage),
            order: sortBy,
        })

        res.status(200).json({
            status: 200,
            page: Number(page),
            per_page: Number(perPage),
            total_page: Math.ceil(count / perPage),
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
            include: ['category'],
        })
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const images = await ProductImage.findAll({
            where: {
                product_id: product.id,
            },
        })

        res.status(200).json({
            status: 200,
            data: {
                product,
                images,
            },
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { name: req.body.name },
            paranoid: false,
        })
        if (product) {
            return res.status(400).json({
                status: 400,
                message: 'Tên sản phẩm tồn tại',
            })
        }

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
                message: '404 Not Found',
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
                message: '404 Not Found',
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
