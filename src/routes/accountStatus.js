const express = require('express')
const router = express.Router()

// modal
const AccountStatus = require('../models/accountStatus')

// validate
// const { checkId, checkCreate } = require('../validations/customer')

// middleware
// const logValidation = require('../middlewares/validation')

// utils
const display = require('../utils/display')

router.get('/', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findAll()

        res.json(display(200, 'List of orderStatus returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'AccountStatus not found'))
        }

        res.json(display(200, 'AccountStatus returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findOne({ where: { code: req.body.code } })
        if (instance) {
            return next(display(400, 'AccountStatus\'s code already exists'))
        }

        const instance2 = await AccountStatus.findOne({ where: { name: req.body.name } })
        if (instance2) {
            return next(display(400, 'AccountStatus\'s name already exists'))
        }

        const newInstance = await AccountStatus.create({
            code: req.body.code,
            name: req.body.name,
        })

        res.json(display(200, 'AccountStatus created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'AccountStatus not found'))
        }

        const instance2 = await AccountStatus.findOne({ where: { code: req.body.code } })
        if (instance2 && instance2.id != req.params.id) {
            return next(display(400, 'AccountStatus\'s code already exists'))
        }

        const instance3 = await AccountStatus.findOne({ where: { name: req.body.name } })
        if (instance3 && instance3.id != req.params.id) {
            return next(display(400, 'AccountStatus\'s name already exists'))
        }

        const [result, newInstance] = await AccountStatus.update({
            code: req.body.code,
            name: req.body.name,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.json(display(200, 'AccountStatus updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'AccountStatus not found'))
        }

        const newInstance = await AccountStatus.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'AccountStatus deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'AccountStatus not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'AccountStatus must be soft deleted before continue'))
            }
        }

        const newInstance = await AccountStatus.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'AccountStatus restored successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id/destroy', async (req, res, next) => {
    try {
        const instance = await AccountStatus.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'AccountStatus not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'AccountStatus must be soft deleted before continue'))
            }
        }

        const newInstance = await AccountStatus.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.json(display(200, 'AccountStatus deleted successfully', newInstance))
    } catch (err) {
        next(err)
    }
})

module.exports = router