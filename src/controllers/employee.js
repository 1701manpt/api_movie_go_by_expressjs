require('dotenv').config()

// models
const Employee = require('../models/employee')
const Role = require('../models/Role')
const User = require('../models/User')

// utils
const display = require('../utils/display')
const { toHash } = require('../utils/password')

const getAll = async (req, res, next) => {
    try {
        const list = await Employee.findAll({
            include: [
                {
                    association: 'user',
                    include: 'userStatus'
                },
                {
                    association: 'role',
                },
            ]
        })

        res.status(200).json(display({
            message: 'Lấy danh sách nhân viên thành công',
            data: list
        }))
    }
    catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            },
            include: [
                {
                    association: 'user',
                    include: 'userStatus'
                },
                {
                    association: 'role',
                },
            ]
        })

        if (!employee) {
            return res.status(400).json(display({
                message: 'Nhân viên không tồn tại'
            }))
        }

        res.status(200).json(display({
            message: 'Lấy nhân viên thành công',
            data: employee
        }))
    }
    catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.params.id)

        if (!employee) {
            return res.status(400).json(display({
                message: 'Nhân viên không tồn tại'
            }))
        }

        const [result, newCustomer] = await Employee.update({
            fullName: req.body.fullName
        }, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json(display({
            message: 'Cập nhật nhân viên thành công',
            data: newCustomer
        }))
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Employee.findByPk(req.params.id)
        if (!instance) {
            return res.status(400).json(display({
                message: 'Nhân viên không tồn tại'
            }))
        }

        const newInstance = await Employee.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Xóa nhân viên thành công'
        }))
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await Employee.findOne({ where: { id: req.params.id }, paranoid: false })

        if (!instance) {
            return res.status(400).json(display({
                message: 'Nhân viên không tồn tại'
            }))
        }

        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Nhân viên chưa xóa mềm'
            }))
        }

        const newInstance = await Employee.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true
        })

        res.status(200).json(display({
            message: 'Xóa nhân viên thành công'
        }))
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await Employee.findOne({ where: { id: req.params.id }, paranoid: false })
        if (!instance) {
            return res.status(400).json(display({
                message: 'Nhân viên không tồn tại'
            }))
        }

        if (instance.deletedAt == null) {
            return res.status(400).json(display({
                message: 'Nhân viên chưa xóa mềm'
            }))
        }

        const newInstance = await Employee.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true // delete record from database
        })

        res.status(200).json(display({
            message: 'Xóa nhân viên thành công'
        }))
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                account: req.body.account,
            },
            paranoid: false
        })

        if (user) {
            return res.status(400).json(display({
                message: 'Tài khoản tồn tại'
            }))
        }

        const checkRole = await Role.findByPk(req.body.roleId)
        if (!checkRole) {
            return res.status(400).json(display({
                message: 'Vai trò không tồn tại'
            }))
        }

        // cần bổ sung
        // kiểm tra email đã sử dụng
        // kiểm tra có tồn tại roleId

        const newEmployee = await Employee.create({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            user: {
                email: req.body.email,
                account: req.body.account,
                password: toHash(req.body.password),
                userStatusId: 2,
            },
            roleId: req.body.roleId,
        }, {
            include: {
                association: 'user'
            }
        })

        // const confirmationCode = generateTokenRegister({
        //     id: newEmployee.user.id,
        // })

        res.status(200).json(display({
            message: 'Đăng ký thành công',
            data: newEmployee,
        }))

        // req.confirmationCode = confirmationCode
        // return next()  // go to sendMail
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, update, destroy, restore, destroyForce, create }