require('dotenv').config()

// models
const Employee = require('~/models/employee')
// const Role = require('~/models/role')

// utils
const { comparePassword } = require('~/utils/password')

const getAll = async (req, res, next) => {
    try {
        const list = await Employee.findAll({
            include: [
                {
                    association: 'role',
                },
                {
                    association: 'user_status',
                },
            ],
        })

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
        const employee = await Employee.findOne({
            where: {
                user_id: req.params.id,
            },
            include: [
                {
                    association: 'role',
                },
                {
                    association: 'user_status',
                },
            ],
        })

        if (!employee) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: employee,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.params.id)

        if (!employee) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const newCustomer = await Employee.update(
            {
                full_name: req.body.full_name,
            },
            {
                where: { id: req.params.id },
                returning: true,
                plain: true,
            },
        )

        res.status(200).json({
            status: 200,
            data: newCustomer[1],
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Employee.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        await Employee.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json({
            status: 200,
        })
    } catch (err) {
        next(err)
    }
}

const restore = async (req, res, next) => {
    try {
        const instance = await Employee.findOne({
            where: { id: req.params.id },
            paranoid: false,
        })

        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        await Employee.restore({
            where: { id: req.params.id },
            returning: true,
            plain: true,
        })

        res.status(200).json({
            status: 200,
        })
    } catch (err) {
        next(err)
    }
}

const destroyForce = async (req, res, next) => {
    try {
        const instance = await Employee.findOne({
            where: { id: req.params.id },
            paranoid: false,
        })
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        await Employee.destroy({
            where: { id: req.params.id },
            returning: true,
            plain: true,
            force: true, // delete record from database
        })

        res.status(200).json({
            status: 200,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const newEmployee = await Employee.create({
            full_name: req.body.full_name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            account: req.body.account,
            password: comparePassword(req.body.password),
            status_id: 2,
            role_id: req.body.role_id,
        })

        res.status(200).json({
            status: 200,
            data: newEmployee,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    update,
    destroy,
    restore,
    destroyForce,
    create,
}
