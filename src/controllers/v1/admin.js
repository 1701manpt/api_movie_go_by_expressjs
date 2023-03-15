require('dotenv').config()
const { Op } = require('sequelize')
const Admin = require('~/models/admin')
const User = require('~/models/user')
const { comparePassword } = require('~/utils/password')

const getAll = async (req, res, next) => {
    try {
        const { query } = req
        const option = {}

        // search by field `id`
        if (query.ids) {
            const array = query.ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.id = search
        }

        // search by field `full_name`
        if (query.full_name) {
            const names = query.full_name.split(' ')
            const searchName = {
                [Op.or]: names.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.full_name = searchName
        }

        // search by field `phone_number`
        if (query.phone_number) {
            const descriptions = query.phone_number.split(' ')
            const searchDescription = {
                [Op.or]: descriptions.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.phone_number = searchDescription
        }

        // search by field `address`
        if (query.address) {
            const genres = query.address.split(',' || ' ')
            const searchGenre = {
                [Op.or]: genres.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.address = searchGenre
        }

        // paginate results
        const perPage = query.per_page || 5
        const page = query.page || 1

        // sort by fields
        const sortBy =
            query?.sort_by?.split(',').map(e => {
                if (e.includes('-')) {
                    return [e.slice(1), 'DESC']
                }
                return [e, 'ASC']
            }) || []

        const { count, rows } = await Admin.findAndCountAll({
            where: option,
            limit: Number(perPage),
            offset: Number(page * perPage - perPage),
            order: sortBy,
        })

        res.status(200).json({
            status: 200,
            page: Number(page),
            per_page: Number(perPage),
            total_page: Math.ceil(count / perPage),
            total_record: count,
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
