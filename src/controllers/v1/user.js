require('dotenv').config()
const Customer = require('~/models/customer')
const User = require('~/models/user')
const search = require('~/search/user')
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

        const { count, rows } = await User.scope(['includeCustomer']).findAndCountAll({
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
        let id = req.params.id
        let user
        // phân quyền: nếu là customer thì chỉ lấy orders của chính chủ
        if (req.user.role_id === 2) {
            const customer = await Customer.findOne({
                where: {
                    user_id: req.user.id,
                },
            })

            if (!customer) {
                return res.status(400).json({
                    status: 400,
                    message: '400 Bad Request',
                })
            }

            user = await User.scope(['includeCustomer']).findOne({
                where: {
                    customer_id: customer.id,
                },
            })
        } else {
            user = await User.scope(['includeCustomer']).findById(id)
        }

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Not Found',
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
                message: 'Not Found',
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
