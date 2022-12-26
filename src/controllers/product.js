// modal
const Category = require('../models/category')
const Product = require('../models/product')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const list = await Product.findAll({
            include: 'category',
        })

        res.status(200).json(display({
            message: 'Lấy danh sách sản phẩm thành công',
            data: list
        }))
    }
    catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: 'category',
        })
        if (!product) {
            return res.status(400).json(display({
                message: 'Sản phẩm không tồn tại'
            }))
        }

        res.status(200).json(display({
            message: 'Lấy sản phẩm thành công',
            data: product
        }))
    }
    catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { name: req.body.name },
            paranoid: false
        })
        if (product) {
            return res.status(400).json(display({
                message: 'Sản phẩm tồn tại'
            }))
        }

        if (req.body.categoryId) {
            const category = await Category.findOne({
                where: { id: req.body.categoryId }
            })
            if (!category) {
                return res.status(400).json(display({
                    message: 'Danh mục không tồn tại'
                }))
            }
        }

        const newInstance = await Product.create({
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            categoryId: req.body?.categoryId,
        })

        res.status(200).json(display({
            message: 'Tạo sản phẩm thành công',
            data: newInstance
        }))
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(400).json(display({
                message: 'Sản phẩm không tồn tại'
            }))
        }

        const productCheckName = await Product.findOne({
            where: {
                name: req.body.name
            }
        })

        if (productCheckName) {
            return res.status(400).json(display({
                message: 'Tên sản phẩm đã tồn tại'
            }))
        }

        const [result, newProduct] = await Product.update({
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            categoryId: req.body?.categoryId,
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json(display({
            message: 'Cập nhật sản phẩm thành công',
            data: newProduct
        }))
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(400).json(display({
                message: 'Sản phẩm không tồn tại'
            }))
        }

        await Product.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Xóa sản phẩm thành công'
        }))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return res.status(400).json(display({
                message: 'Sản phẩm không tồn tại'
            }))
        }

        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Sản phẩm chưa xóa mềm'
            }))
        }

        await Product.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Xóa sản phẩm thành công'
        }))
    } catch (error) {
        next(error)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await Product.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return res.status(400).json(display({
                message: 'Sản phẩm không tồn tại'
            }))
        }
        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Sản phẩm chưa xóa mềm'
            }))
        }

        await Product.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.status(200).json(display({
            message: 'Xóa sản phẩm thành công'
        }))
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, create, update, destroy, restore, destroyForce }