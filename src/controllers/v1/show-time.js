const { Op } = require('sequelize')
const ShowTime = require('~/models/show-time')
const Threater = require('~/models/threater')
const Movie = require('~/models/movie')

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

        // search by field `threater_id`
        if (query.threater_ids) {
            const threaters = query.threater_ids.split(',')
            const searchThreaterId = {
                [Op.in]: threaters,
            }
            option.threater_id = searchThreaterId
        }

        // search by field `movie_id`
        if (query.movie_ids) {
            const array = query.movie_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.movie_id = search
        }

        // search by field `date_time`
        if (query.min_date_time && query.max_date_time) {
            const searchDateTime = {
                [Op.between]: [query.min_date_time, query.max_date_time],
            }
            option.date_time = searchDateTime
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

        const { count, rows } = await ShowTime.findAndCountAll({
            where: option,
            include: ['threater', 'movie', 'tickets'],
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
        const showTime = await ShowTime.findByPk(req.params.id, {
            include: ['threater', 'movie', 'tickets'],
        })
        if (!showTime) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: showTime,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const threater = await Threater.findByPk(req.body.threater_id)
        const movie = await Movie.findByPk(req.body.movie_id)
        if (!threater || !movie) {
            return res.status(404).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const showTime = await ShowTime.create({
            movie_id: req.body.movie_id,
            threater_id: req.body.threater_id,
            date_time: req.body.date_time,
            price: req.body.price,
        })

        res.status(200).json({
            status: 200,
            data: showTime,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const threater = await Threater.findByPk(req.body.threater_id)
        const movie = await Movie.findByPk(req.body.movie_id)
        if (!threater || !movie) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newShowTime = await ShowTime.update(
            {
                movie_id: req.body?.movie_id,
                threater_id: req.body?.threater_id,
                date_time: req.body?.date_time,
                price: req.body?.price,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newShowTime[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const showTime = await ShowTime.findByPk(req.params.id)
        if (!showTime) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await ShowTime.destroy({
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
