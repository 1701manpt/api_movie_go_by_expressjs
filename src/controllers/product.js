// modal
const Category = require('../models/category')
const Product = require('../models/product')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const instance = await Product.findAll({
            include: 'category',
        })

        res.json(display(200, 'List of product returned successfully', instance.length, instance))
    }
    catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const instance = await Product.findByPk(req.params.id, {
            include: 'category',
        })
        if (!instance) {
            return next(display(404, 'Product not found'))
        }

        res.json(display(200, 'Product returned successfully', instance && 1, instance))
    }
    catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { name: req.body.name }, paranoid: false })
        if (instance) {
            return next(display(400, 'Sản phẩm đã tồn tại'))
        }

        if (req.body.categoryId) {
            const category = await Category.findByPk(req.body.categoryId)
            if (!category) {
                return next(display(400, 'Danh mục không tồn tại'))
            }
        }

        const newInstance = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categoryId: req.body.categoryId || null,
        })

        res.json(display(200, 'Tạo thành công', newInstance && 1, newInstance))
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
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
}

const destroy = async (req, res, next) => {
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
}

const restore = async (req, res, next) => {
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
}

const destroyForce = async (req, res, next) => {
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
}

module.exports = { getAll, getById, create, update, destroy, restore, destroyForce }