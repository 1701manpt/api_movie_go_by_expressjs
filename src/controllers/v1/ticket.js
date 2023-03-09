const ShowTime = require('~/models/show-time')
const Seat = require('~/models/seat')
const Order = require('~/models/order')
const Ticket = require('~/models/ticket')

const getAll = async (req, res, next) => {
    try {
        const list = await Ticket.findAll()

        res.status(200).json({
            status: 200,
            data: list,
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id)
        if (!ticket) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
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
        const seat = await Seat.findByPk(req.body.seat_id)
        const showTime = await ShowTime.findByPk(req.body.show_time_id)
        const order = await Order.findByPk(req.body.order_id)
        if (!seat || !showTime || !order) {
            return res.status(404).json({
                status: 400,
                message: '400 Bad Request',
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
                message: '404 Not Found',
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
                message: '404 Not Found',
            })
        }

        const count = await Ticket.destroy({
            where: { id: req.params.id },
            returning: true,
        })

        res.status(200).json({
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
