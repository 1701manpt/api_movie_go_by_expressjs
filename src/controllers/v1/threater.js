const Threater = require('~/models/threater')
const search = require('~/search/threater')
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

        const { count, rows } = await Threater.scope(['includeSeats']).findAndCountAll({
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
        const threater = await Threater.scope(['includeSeats', 'includeShowTimes']).findByPk(
            req.params.id,
        )
        if (!threater) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Not Found',
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
                message: 'Not Found',
            })
        }

        const count = await Threater.destroy({
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
