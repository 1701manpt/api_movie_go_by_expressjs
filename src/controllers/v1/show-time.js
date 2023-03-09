const ShowTime = require('~/models/show-time')
const Threater = require('~/models/threater')
const Movie = require('~/models/movie')

const getAll = async (req, res, next) => {
    try {
        const list = await ShowTime.findAll()

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
        const showTime = await ShowTime.findByPk(req.params.id)
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
