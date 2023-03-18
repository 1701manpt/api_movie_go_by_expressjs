const Cart = require('~/models/cart')
const CartLine = require('~/models/cart-line')
const Customer = require('~/models/customer')
const Product = require('~/models/product')
const User = require('~/models/user')
const search = require('~/search/cart')
const Pagination = require('~/utils/pagination')
const sortBy = require('~/utils/sort-by')

const getAll = async (req, res, next) => {
    try {
        const { query } = req

        // phân quyền: nếu là customer thì chỉ lấy orders của chính chủ
        if (req.user.role_id === 2) {
            const customer = await Customer.findOne({
                where: {
                    user_id: req.user.id,
                },
            })

            if (!customer) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request',
                })
            }

            query.customer_ids = customer.id
        }

        // pagination
        const pagination = new Pagination({
            perPage: query.per_page,
            page: query.page,
        })

        // searchs
        const where = search(query)

        // sort by
        const sort = sortBy(query.sort_by)

        const { count, rows } = await Cart.scope(['includeCustomer']).findAndCountAll({
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
        let id = req.params.id
        let cart
        // phân quyền: nếu là customer thì chỉ lấy orders của chính chủ
        if (req.user.role_id === 2) {
            const customer = await Customer.findOne({
                where: {
                    user_id: req.user.id,
                },
            })

            if (!customer) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request',
                })
            }

            cart = await Cart.scope(['includeCartLines', 'includeCustomer']).findOne({
                where: {
                    customer_id: customer.id,
                },
            })
        } else {
            cart = await Cart.scope(['includeCartLines', 'includeCustomer']).findById(id)
        }

        if (!cart) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            include: {
                as: 'user',
                model: User,
                where: {
                    id: req.user.id,
                },
            },
        })

        const cart = await Cart.create({
            customer_id: customer.id,
        })

        for (const cartLine of req.body.cart_lines) {
            const product = await Product.findByPk(cartLine.product_id)
            if (!product) {
                return res.status(404).json({
                    status: 400,
                    message: 'Bad Request',
                })
            }

            await CartLine.create({
                cart_id: cart.id,
                ...cartLine,
            })
        }

        res.status(200).json({
            status: 200,
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}

// const update = async (req, res, next) => {
//    try {
//       const product = await Product.findByPk(req.params.id)
//       if (!product) {
//          return res.status(404).json({
//             status: 404,
//             message: 'Not Found',
//          })
//       }

//       const [result, newProduct] = await Product.update(
//          {
//             name: req.body?.name,
//             price: req.body?.price,
//             description: req.body?.description,
//             categoryId: req.body?.categoryId,
//             avatar: req.body?.avatar,
//          },
//          {
//             where: { id: req.params.id },
//             returning: true,
//          },
//       )

//       res.status(200).json({
//          status: 200,
//          data: newProduct,
//       })
//    } catch (error) {
//       next(error)
//    }
// }

const destroy = async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id)
        if (!cart) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const count = await Cart.destroy({
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
    destroy,
}
