const express = require('express')
const router = express.Router()

// modal
const Product = require('../models/product')

// validate
// const { checkId, checkCreate } = require('../validations/customer')

// middleware
// const logValidation = require('../middlewares/validation')

// utils
const display = require('../utils/display')

router.get('/', async (req, res, next) => {
    try {
        const instance = await Product.findAll()

        res.json(display(200, 'List of product returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const instance = await Product.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Product not found'))
        }

        res.json(display(200, 'Product returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { name: req.body.name }, paranoid: false })
        if (instance) {
            return next(display(400, 'Product already exists'))
        }

        const newInstance = await Product.create({
            name: req.body.name,
            price: req.body.price,
        })

        res.json(display(200, 'Product created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const instance = await Product.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Product not found'))
        }

        const instance2 = await Product.findOne({ where: { name: req.body.name }, paranoid: false })
        if (instance2 && (instance2.id != req.params.id)) {
            return next(display(400, 'Name\'s product exists already'))
        }

        const [result, newInstance] = await Product.update({
            name: req.body.name,
            price: req.body.price,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.json(display(200, 'Product updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const instance = await Product.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Product not found'))
        }

        const newInstance = await Product.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'Product deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'Product not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'Product must be soft deleted before continue'))
            }
        }

        const newInstance = await Product.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'Product restored successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id/destroy', async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return next(display(404, 'Product not found'))
        } else {
            if (instance.deletedAt === null) {
                return next(display(400, 'Product must be soft deleted before continue'))
            }
        }

        const newInstance = await Product.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.json(display(200, 'Product deleted successfully', newInstance))
    } catch (err) {
        next(err)
    }
})

module.exports = router