const Movie = require('~/models/movie')

const getAll = async (req, res, next) => {
    try {
        const list = await Movie.findAll()

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
        const movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: movie,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const movie = await Movie.create({
            name: req.body.name,
            genre: req.body.genre,
            duration: req.body.duration,
            description: req.body?.description || null,
            poster_url: req.body.poster_url,
            trailer_url: req.body.trailer_url,
        })

        res.status(200).json({
            status: 200,
            data: movie,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newMovie = await Movie.update(
            {
                name: req.body?.name,
                genre: req.body?.genre,
                duration: req.body?.duration,
                description: req.body?.description,
                poster_url: req.body?.poster_url,
                trailer_url: req.body?.trailer_url,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newMovie[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await Movie.destroy({
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
    destroy,
    update
}
