// modal
const OrderStatus = require('../models/orderStatus')
// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findAll()

        res.json(display(200, 'List of orderStatus returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'OrderStatus not found'))
        }

        res.json(display(200, 'OrderStatus returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findOne({ where: { code: req.body.code } })
        if (instance) {
            return next(display(400, 'OrderStatus\'s code already exists'))
        }

        const instance2 = await OrderStatus.findOne({ where: { name: req.body.name } })
        if (instance2) {
            return next(display(400, 'OrderStatus\'s name already exists'))
        }

        const newInstance = await OrderStatus.create({
            code: req.body.code,
            name: req.body.name,
        })

        res.json(display(200, 'OrderStatus created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'OrderStatus not found'))
        }

        const instance2 = await OrderStatus.findOne({ where: { code: req.body.code } })
        if (instance2 && instance2.id != req.params.id) {
            return next(display(400, 'OrderStatus\'s code already exists'))
        }

        const instance3 = await OrderStatus.findOne({ where: { name: req.body.name } })
        if (instance3 && instance3.id != req.params.id) {
            return next(display(400, 'OrderStatus\'s name already exists'))
        }

        const [result, newInstance] = await OrderStatus.update({
            code: req.body.code,
            name: req.body.name,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.json(display(200, 'OrderStatus updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'OrderStatus not found'))
        }

        const newInstance = await OrderStatus.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'OrderStatus deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'OrderStatus not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'OrderStatus must be soft deleted before continue'))
            }
        }

        const newInstance = await OrderStatus.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'OrderStatus restored successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await OrderStatus.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'OrderStatus not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'OrderStatus must be soft deleted before continue'))
            }
        }

        const newInstance = await OrderStatus.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.json(display(200, 'OrderStatus deleted successfully', newInstance))
    } catch (err) {
        next(err)
    }
}

module.exports = { getAll, getById, create, update, destroy, restore, destroyForce }