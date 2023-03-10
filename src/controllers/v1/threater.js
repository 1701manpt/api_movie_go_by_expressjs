const { Op } = require('sequelize')
const Threater = require('~/models/threater')

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

        const { count, rows } = await Threater.findAndCountAll({
            where: option,
            include: ['show_times', 'seats',],
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
        const threater = await Threater.findByPk(req.params.id)
        if (!threater) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: threater,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const threater = await Threater.create({
            name: req.body.name,
        })

        res.status(200).json({
            status: 200,
            data: threater,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const threater = await Threater.findByPk(req.params.id)
        if (!threater) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newThreater = await Threater.update(
            {
                name: req.body?.name,
            },
            {
                where: { id: req.params.id },
                returning: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newThreater[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const threater = await Threater.findByPk(req.params.id)
        if (!threater) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await Threater.destroy({
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
