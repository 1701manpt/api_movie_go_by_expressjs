const Seat = require('~/models/seat')
const Threater = require('~/models/threater')
const search = require('~/searchs/seat')
const Pagination = require('~/utils/pagination')
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

        const { count, rows } = await Seat.scope(['includeThreater']).findAndCountAll({
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
        const seat = await Seat.findByPk(req.params.id)
        if (!seat) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Bad Request',
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
                message: 'Not Found',
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
                message: 'Not Found',
            })
        }

        const count = await Seat.destroy({
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
    update,
    create,
    destroy,
}
