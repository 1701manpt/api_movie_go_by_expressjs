const ShowTime = require('~/models/show-time')
const Seat = require('~/models/seat')
const Order = require('~/models/order')
const Ticket = require('~/models/ticket')
const Pagination = require('~/utils/pagination')
const search = require('~/search/ticket')
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

        const { count, rows } = await Ticket.scope(['includeShowTime']).findAndCountAll({
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
