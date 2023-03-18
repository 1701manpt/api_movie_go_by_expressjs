const Movie = require('~/models/movie')
const search = require('~/search/movie')
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

        const { count, rows } = await Movie.scope(['includeShowTimes']).findAndCountAll({
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
        const movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Not Found',
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
                message: 'Not Found',
            })
        }

        const count = await Movie.destroy({
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
    destroy,
    update,
}
