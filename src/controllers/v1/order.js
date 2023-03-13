// models
const Order = require('~/models/order')
const Customer = require('~/models/customer')
const { Op } = require('sequelize')
const sequelize = require('~/connection')
const OrderLine = require('~/models/order-line')

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
        if (query.customer_ids) {
            const array = query.customer_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.customer_id = search
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

        const { count, rows } = await Order.findAndCountAll({
            where: option,
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
        const instance = await Order.findByPk(req.params.id, {
        })
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: instance,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.body.customer_id)
        if (!customer) {
            return res.status(400).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const newOrder = await sequelize.transaction(async t => {
            const newOrder = await Order.create(
                {
                    customer_id: req.body.customer_id,
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
                message: '404 Not Found',
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
                message: '404 Not Found',
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
