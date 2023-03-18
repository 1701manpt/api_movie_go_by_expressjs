const sequelize = require('~/connection')
const Order = require('~/models/order')
const Customer = require('~/models/customer')
const OrderLine = require('~/models/order-line')
const Pagination = require('~/utils/pagination')
const sortBy = require('~/utils/sort-by')
const search = require('~/search/order')

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
                    message: '400 Bad Request',
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

        const { count, rows } = await Order.scope([
            'includeCustomer',
            'includeStatus',
        ]).findAndCountAll({
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
        let order
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
                    message: '400 Bad Request',
                })
            }

            order = await Order.scope(['includeOrderLines', 'includeCustomer']).findOne({
                where: {
                    customer_id: customer.id,
                },
            })
        } else {
            order = await Order.scope(['includeOrderLines', 'includeCustomer']).findById(id)
        }

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: order,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            where: {
                user_id: req.user.id,
            },
        })

        if (!customer) {
            return res.status(400).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const newOrder = await sequelize.transaction(async t => {
            const newOrder = await Order.create(
                {
                    customer_id: customer.id,
                    status_id: 1,
                },
                {
                    transaction: t,
                },
            )

            for (const orderLine of req.body.order_lines) {
                await OrderLine.create(
                    {
                        order_id: newOrder.id,
                        product_id: orderLine.product_id,
                        quantity: orderLine.quantity,
                    },
                    {
                        transaction: t,
                    },
                )
            }

            return newOrder
        })

        res.status(200).json({
            status: 200,
            data: newOrder,
        })

        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)
    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }
        const [count, updatedOrder] = await Order.update(
            {
                status_id: req.body.status_id,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )
        res.status(200).json({
            status: 200,
            count: count,
            data: updatedOrder,
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Order.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }
        const count = await Order.destroy({
            where: { id: req.params.id },
            returning: true,
        })
        res.json({
            status: 200,
            count: count,
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
