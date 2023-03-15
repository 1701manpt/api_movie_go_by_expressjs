const { Op } = require('sequelize')
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

        // search by field `name`
        if (query.name) {
            const names = query.name.split(' ')
            const searchName = {
                [Op.or]: names.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.name = searchName
        }

        // search by field `description`
        if (query.description) {
            const descriptions = query.description.split(' ')
            const searchDescription = {
                [Op.and]: descriptions.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.description = searchDescription
        }

        // search by field `price`
        if (query.min_duration && query.max_duration) {
            const searchDuration = {
                [Op.between]: [query.min_duration, query.max_duration],
            }
            option.duration = searchDuration
        }

        if (query.min_duration && !query.max_duration) {
            const search = {
                [Op.gt]: Number(query.min_duration),
            }
            option.duration = search
        }

        if (!query.min_duration && query.max_duration) {
            const search = {
                [Op.lt]: Number(query.max_duration),
            }
            option.duration = search
        }

        // search by field `genre`
        if (query.genre) {
            const genres = query.genre.split(',' || ' ')
            const searchGenre = {
                [Op.or]: genres.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.genre = searchGenre
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

        const { count, rows } = await Movie.scope(
            'includeShowTime',
        ).findAndCountAll({
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
