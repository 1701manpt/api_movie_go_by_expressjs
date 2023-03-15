const { Op } = require('sequelize')
const Cart = require('~/models/cart')
const CartLine = require('~/models/cart-line')
const Customer = require('~/models/customer')
const Product = require('~/models/product')
const User = require('~/models/user')

const getAll = async (req, res, next) => {
    try {
        const { query } = req
        const option = {}

        // search by field `id`
        if (query.ids) {
            const array = query.ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.id = search
        }

        // search by field `customer_id`
        if (req.user.role_id === 1) {
            if (query.customer_ids) {
                const array = query.customer_ids.split(',')
                const search = {
                    [Op.in]: array,
                }
                option.customer_id = search
            }
        }

        if (req.user.role_id !== 1) {
            const customer = await Customer.findOne({
                include: {
                    as: 'user',
                    model: User,
                    where: {
                        id: req.user.id
                    }
                },
            })
            option.customer_id = customer.id
        }

        // search by field `status_id`
        if (query.status_ids) {
            const array = query.status_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.status_id = search
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

        const { count, rows } = await Cart.findAndCountAll({
            where: option,
            include: ['customer', 'cart_lines'],
            limit: Number(perPage),
            offset: Number(page * perPage - perPage),
            order: sortBy,
        })

        res.status(200).json({
            status: 200,
            page: Number(page),
            per_page: Number(perPage),
            total_page: Math.ceil(count / perPage),
            total_record: count,
            count: rows.length,
            data: rows,
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        let cart;

        switch (req.user.role_id) {
            case 1:
                cart = await Cart.findByPk(req.params.id);
                break;
            case 2:
                const customer = await Customer.findOne({
                    include: {
                        as: 'user',
                        model: User,
                        where: {
                            id: req.user.id
                        }
                    },
                })

                cart = await Cart.findByPk(req.params.id, {
                    where: {
                        customer_id: customer.id
                    }
                })
                break;

            default:
                break;
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
};

const create = async (req, res, next) => {
    try {

        const customer = await Customer.findOne({
            include: {
                as: 'user',
                model: User,
                where: {
                    id: req.user.id
                }
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
                    message: '400 Bad Request',
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
