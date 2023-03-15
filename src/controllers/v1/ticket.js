const { Op } = require('sequelize')
const ShowTime = require('~/models/show-time')
const Seat = require('~/models/seat')
const Order = require('~/models/order')
const Ticket = require('~/models/ticket')

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

        // search by field `show_time_id`
        if (query.show_time_ids) {
            const array = query.show_time_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.show_time_id = search
        }

        // search by field `seat_id`
        if (query.seat_ids) {
            const seats = query.seat_ids.split(',')
            const searchSeatId = {
                [Op.in]: seats,
            }
            option.seat_id = searchSeatId
        }

        // search by field `order_id`
        if (query.order_ids) {
            const orders = query.order_ids.split(',')
            const searchOrderId = {
                [Op.in]: orders,
            }
            option.order_id = searchOrderId
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

        const { count, rows } = await Ticket.findAndCountAll({
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
        const ticket = await Ticket.scope([
            'includeShowTime',
            'includeSeat',
            'includeOrder',
        ]).findByPk(req.params.id)
        if (!ticket) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: ticket,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const showTime = await ShowTime.findByPk(req.body.show_time_id)
        const seat = await Seat.findByPk(req.body.seat_id)
        const order = await Order.findByPk(req.body.order_id)
        if (
            !seat ||
            !showTime ||
            !order ||
            showTime.threater_id !== seat.threater_id
        ) {
            return res.status(404).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const ticketCheck = await Ticket.findOne({
            where: {
                show_time_id: req.body.show_time_id,
                seat_id: req.body.seat_id,
            },
        })

        if (ticketCheck) {
            return res.status(404).json({
                status: 400,
                message: 'Vé đã có người mua',
            })
        }

        const ticket = await Ticket.create({
            show_time_id: req.body.show_time_id,
            seat_id: req.body.seat_id,
            order_id: req.body.order_id,
        })

        res.status(200).json({
            status: 200,
            data: ticket,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const seat = await Seat.findByPk(req.body.seat_id)
        const showTime = await ShowTime.findByPk(req.body.show_time_id)
        const order = await Order.findByPk(req.body.order_id)
        if (!seat || !showTime || !order) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const newTicket = await Ticket.update(
            {
                show_time_id: req.body?.show_time_id,
                seat_id: req.body?.seat_id,
                order_id: req.body?.order_id,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newTicket[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id)
        if (!ticket) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const count = await Ticket.destroy({
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
