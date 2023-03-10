// models
const Order = require('~/models/order')
const Customer = require('~/models/customer')
const { Op } = require('sequelize')

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
            include: ['customer', 'status', 'order_lines'],
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
        const instance = await Order.findByPk(req.params.id)
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
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newOrder = await Order.create(
            {
                customer_id: req.body.customer_id,
                status_id: 1,
            },
            // {
            //     include: 'order_line',
            // },
        )

        res.status(200).json({
            status: 200,
            data: newOrder,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        // const instance = await Order.findByPk(req.params.id)
        // if (!instance) {
        //     return next(404, 'Order not found')
        // }
        // const [result, newInstance] = await Order.update({
        //     orderStatusId: req.body.orderStatusId,
        // }, {
        //     where: { id: req.params.id },
        //     returning: true,
        //     plain: true,
        // })
        // res.json(display(200, 'Order updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        // const instance = await Order.findByPk(req.params.id)
        // if (!instance) {
        //     return next(display(404, 'Order not found'))
        // }
        // const newInstance = await Order.destroy({
        //     where: { id: req.params.id },
        //     returning: true,
        //     plain: true
        // })
        // res.json(display(200, 'Order deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        // const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
        // if (!instance) {
        //     return next(display(404, 'Order not found'))
        // } else {
        //     if (instance.deletedAt === null) {
        //         return next(display(400, 'Order must be soft deleted before continue'))
        //     }
        // }
        // const newInstance = await Order.destroy({
        //     where: { id: req.params.id },
        //     returning: true,
        //     plain: true,
        //     force: true // delete record from database
        // })
        // res.json(display(200, 'Order deleted successfully', newInstance))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        // const instance = await Order.findOne({ where: { id: req.params.id }, paranoid: false })
        // if (!instance) {
        //     return next(display(404, 'Order not found'))
        // } else {
        //     if (instance.deletedAt === null) {
        //         return next(display(400, 'Order must be soft deleted before continue'))
        //     }
        // }
        // const newInstance = await Order.restore({
        //     where: { id: req.params.id },
        //     returning: true,
        //     plain: true
        // })
        // res.json(display(200, 'Order restored successfully', newInstance && 1, newInstance))
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
    destroyForce,
    restore,
}
