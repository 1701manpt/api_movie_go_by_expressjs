const Threater = require('~/models/threater')

const getAll = async (req, res, next) => {
    try {
        const list = await Threater.findAll()

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
