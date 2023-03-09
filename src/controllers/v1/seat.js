const { Op } = require('sequelize')
const Seat = require('~/models/seat')
const Threater = require('~/models/threater')

const getAll = async (req, res, next) => {
    try {
        const query = req.query
        const option = {}

        // search by field `threater_id`
        if (query.threaters) {
            const threaters = query.threaters?.split(',') || [query.threaters]
            const searchThreaterId = {
                [Op.in]: threaters,
            }
            option.threater_id = searchThreaterId
        }

        // search by field `text`, `number`
        if (query.rows || query.columns) {
            const rs = query.rows.split(',')
            const cs = query.columns.split(',')
            const searchText = {
                [Op.or]: rs.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            const searchNumber = {
                [Op.or]: cs.map(term => ({
                    [Op.eq]: Number(term),
                })),
            }
            option.text = searchText
            option.number = searchNumber
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

        const { count, rows } = await Seat.findAndCountAll({
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
            count: rows.length,
            data: rows,
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const seat = await Seat.findByPk(req.params.id)
        if (!seat) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: seat,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const threater = await Threater.findByPk(req.body.product_id)
        if (!threater) {
            return res.status(404).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const seat = await Seat.create({
            threater_id: req.body.threater_id,
            text: req.body.text,
            number: req.body.number,
        })

        res.status(200).json({
            status: 200,
            data: seat,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const seat = await Seat.findByPk(req.params.id)
        if (!seat) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newSeat = await Seat.update(
            {
                text: req.body.text,
                number: req.body.number,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newSeat[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const seat = await Seat.findByPk(req.params.id)
        if (!seat) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await Seat.destroy({
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
    update,
    create,
    destroy,
}
