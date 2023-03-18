const ShowTime = require('~/models/show-time')
const Threater = require('~/models/threater')
const Movie = require('~/models/movie')
const sortBy = require('~/utils/sort-by')
const search = require('~/search/show-time')

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

        const { count, rows } = await ShowTime.scope(['includeMovie']).findAndCountAll({
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
        const showTime = await ShowTime.scope(['includeThreater', 'includeMovie']).findByPk(
            req.params.id,
        )
        if (!showTime) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Not Found',
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
                message: 'Not Found',
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
