// modal
const Category = require('../models/category')
const Product = require('../models/product')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const instance = await Category.findAll()

        res.json(display(200, 'List of category returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const instance = await Category.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Category not found'))
        }

        res.json(display(200, 'Category returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const instance = await Category.findOne({ where: { name: req.body.name }, paranoid: false })
        if (instance) {
            return next(display(400, 'Category already exists'))
        }

        const newInstance = await Category.create({
            name: req.body.name,
        })

        res.json(display(200, 'Category created successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const instance = await Category.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Category not found'))
        }

        const instance2 = await Category.findOne({ where: { name: req.body.name }, paranoid: false })
        if (instance2 && (instance2.id != req.params.id)) {
            return next(display(400, 'Name\'s category exists already'))
        }

        const [result, newInstance] = await Category.update({
            name: req.body.name,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.json(display(200, 'Category updated successfully', !result && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Category.findByPk(req.params.id)
        if (!instance) {
            return next(display(404, 'Category not found'))
        }

        const newInstance = await Category.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.json(display(200, 'Category deleted successfully', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const getProductsByCategory = async (req, res, next) => {
    const products = await Product.findAll({
        where: { categoryId: req.params.id },
        include: {
            association: 'category',
        }
    })

    res.status(200).json(display(200, 'Trả về thành công', products.length, products))
}

module.exports = { getAll, getById, create, update, destroy, getProductsByCategory }