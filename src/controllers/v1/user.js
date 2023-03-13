require('dotenv').config()
const { Op } = require('sequelize')
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

        // search by field `role_id`
        if (query.role_ids) {
            const array = query.role_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.role_id = search
        }

        // search by field `status_id`
        if (query.status_ids) {
            const array = query.status_ids.split(',')
            const search = {
                [Op.in]: array,
            }
            option.status_id = search
        }

        // search by field `account`
        if (query.accounts) {
            const descriptions = query.accounts.split(',')
            const searchDescription = {
                [Op.or]: descriptions.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.account = searchDescription
        }

        // search by field `email`
        if (query.emails) {
            const descriptions = query.emails.split(',')
            const searchDescription = {
                [Op.or]: descriptions.map(term => ({
                    [Op.like]: `%${term}%`,
                })),
            }
            option.email = searchDescription
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

        const { count, rows } = await User.findAndCountAll({
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
        const user = await User.findByPk(req.body.id, {
        })

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const password = await comparePassword(req.body.password)
        const [count, rows] = await User.update(
            {
                password,
            },
            {
                where: { id: req.params.id },
                returning: true,
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
        const instance = await User.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await User.destroy({
            where: { id: req.params.id },
            returning: true,
        })

        res.status(200).json({
            status: 200,
            count,
        })
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const password = await comparePassword(req.body.password)
        const newEmployee = await User.create({
            full_name: req.body.full_name,
            email: req.body.email,
            account: req.body.account,
            password,
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
    create,
}
