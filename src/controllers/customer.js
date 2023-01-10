// modal
const Customer = require('../models/customer')
const Order = require('../models/order')
const User = require('../models/User')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
    try {
        const list = await Customer.findAll({
            include: {
                association: 'user',
                include: 'userStatus'
            }
        })

        res.status(200).json(display({
            message: 'Lấy danh sách khách hàng thành công',
            data: list
        }))
    }
    catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            where: {
                userId: req.params.id
            },
            include: {
                association: 'user',
                include: 'userStatus'
            }
        })

        if (!customer) {
            return res.status(400).json(display({
                message: 'Khách hàng không tồn tại'
            }))
        }

        res.status(200).json(display({
            message: 'Lấy khách hàng thành công',
            data: customer
        }))
    }
    catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id)

        if (!customer) {
            return res.status(400).json(display({
                message: 'Khách hàng không tồn tại'
            }))
        }

        const [result, newCustomer] = await Customer.update({
            fullName: req.body.fullName
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json(display({
            message: 'Cập nhật khách hàng thành công',
            data: newCustomer
        }))
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Customer.findByPk(req.params.id)
        if (!instance) {
            return res.status(400).json(display({
                message: 'Khách hàng không tồn tại'
            }))
        }

        const oldCustomer = await Customer.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        const oldUser = await User.destroy({
            where: { id: instance.userId },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Xóa khách hàng thành công'
        }))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await Customer.findOne({ where: { id: req.params.id }, paranoid: false })

        if (!instance) {
            return res.status(400).json(display({
                message: 'Khách hàng không tồn tại'
            }))
        }

        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Khách hàng chưa xóa mềm'
            }))
        }

        const restoreCustomer = await Customer.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        const restoreUser = await User.restore({
            where: { id: instance.userId },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Khôi phục khách hàng thành công'
        }))
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await Customer.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return res.status(400).json(display({
                message: 'Khách hàng không tồn tại'
            }))
        }

        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Khách hàng chưa xóa mềm'
            }))
        }

        const destroyCustomer = await Customer.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        const destroyUser = await User.destroy({
            where: { id: instance.userId },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.status(200).json(display({
            message: 'Xóa khách hàng thành công'
        }))
    } catch (error) {
        next(error)
    }
}

const getAllOrder = async (req, res, next) => {
    try {
        const instance = await Order.findAll({ where: { customerId: req.params.id } })
        if (!instance) {
            return res.status(400).json(display({
                message: 'Khách hàng chưa có đơn hàng hoặc không tồn tại'
            }))
        }

        res.status(200).json(display({
            message: 'Lấy danh sách đơn hàng thành công',
            data: instance
        }))
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, update, destroy, restore, destroyForce, getAllOrder }