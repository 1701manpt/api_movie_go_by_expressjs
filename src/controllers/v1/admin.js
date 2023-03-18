require('dotenv').config()
const Admin = require('~/models/admin')
const User = require('~/models/user')
const search = require('~/search/admin')
const Pagination = require('~/utils/pagination')
const { comparePassword } = require('~/utils/password')
const sortBy = require('~/utils/sort-by')

const getAll = async (req, res, next) => {
    try {
        const { query } = req

        // pagination
        const pagination = new Pagination({
            perPage: query.per_page,
            page: query.page,
        })

        // searchs
        const where = search(query)

        // sort by
        const sort = sortBy(query.sort_by)

        const { count, rows } = await Admin.scope(['includeCustomer']).findAndCountAll({
            where: where,
            limit: pagination.getLimit(),
            offset: pagination.getOffset(),
            order: sort,
        })

        pagination.setCount(count)

        res.status(200).json({
            status: 200,
            ...pagination.getInfor(),
            count: rows.length,
            data: rows,
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const admin = await Admin.findOne(req.body.id, {})

        if (!admin) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: admin,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const admin = await Admin.findByPk(req.params.id)

        if (!admin) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const [count, rows] = await Admin.update(
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
            count,
            data: rows,
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const instance = await Admin.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        await Admin.destroy({
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
        const instance = await Admin.findOne({
            where: { id: req.params.id },
            paranoid: false,
        })

        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        await Admin.restore({
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
        const instance = await Admin.findOne({
            where: { id: req.params.id },
            paranoid: false,
        })
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        await Admin.destroy({
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
        const password = await comparePassword(req.body.password)
        const newAdmin = await Admin.create(
            {
                full_name: req.body.full_name,
                address: req.body.address,
                phone: req.body.phone,
                user: {
                    email: req.body.email,
                    account: req.body.account,
                    password,
                    status_id: 2,
                    role_id: req.body.role_id,
                },
            },
            {
                include: {
                    as: 'user',
                    model: User,
                },
            },
        )

        res.status(200).json({
            status: 200,
            data: newAdmin,
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
