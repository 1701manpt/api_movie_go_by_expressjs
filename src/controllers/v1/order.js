const sequelize = require('~/connection')
const Order = require('~/models/order')
const Customer = require('~/models/customer')
const OrderLine = require('~/models/order-line')
const Pagination = require('~/utils/pagination')
const sortBy = require('~/utils/sort-by')
const search = require('~/searchs/order')

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
        const checkOrder = await Order.findByPk(req.params.id)
        if (!checkOrder) {
            return res.status(400).json({
                status: 404,
                message: 'Not Found',
            })
        }

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
                    message: 'Bad Request',
                })
            }

            order = await Order.scope(['includeOrderLines', 'includeCustomer']).findOne({
                where: {
                    id: req.params.id,
                    customer_id: customer.id,
                },
            })
            if (!order) {
                return res.status(400).json({
                    status: 403,
                    message: 'Forbidden',
                })
            }
        } else {
            order = await Order.scope(['includeOrderLines', 'includeCustomer']).findById(
                req.params.id,
            )
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
                message: 'Bad Request',
            })
        }

        const orderLines = []

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
                const oL = await OrderLine.create(
                    {
                        order_id: newOrder.id,
                        product_id: orderLine.product_id,
                        quantity: orderLine.quantity,
                    },
                    {
                        transaction: t,
                    },
                )
                orderLines.push(oL)
            }

            return newOrder
        })

        res.status(200).json({
            status: 200,
            data: {
                order: newOrder,
                order_lines: orderLines,
            },
        })
    } catch (error) {
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

        const updatedOrderLines = []
        const updatedOrder = await sequelize.transaction(async t => {
            for (const orderLine of req.body.order_lines) {
                if (orderLine.deleted) {
                    await OrderLine.destroy({
                        where: { id: orderLine.id },
                        transaction: t,
                    })
                } else {
                    const [updatedCount, updatedRows] = await OrderLine.update(orderLine, {
                        where: { id: orderLine.id },
                        returning: true,
                        transaction: t,
                    })

                    updatedOrderLines.push(updatedRows[0])
                }
            }
        })

        res.status(200).json({
            status: 200,
            count: count,
            data: {
                order: updatedOrder,
                order_lines: updatedOrderLines,
            },
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

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

        const deletedCount = await Order.destroy({
            where: { id: req.params.id },
        })

        res.status(200).json({
            status: 200,
            count: deletedCount,
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
