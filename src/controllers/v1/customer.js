// modal
const Customer = require('~/models/customer')
const search = require('~/search/customer')
const Pagination = require('~/utils/pagination')
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

        const { count, rows } = await Customer.scope(['includeUser']).findAndCountAll({
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

            id = customer.id
        }

        const customer = await Customer.scope(['includeUser']).findByPk(id)

        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: customer,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id)

        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        const newCustomer = await Customer.update(
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
        const instance = await Customer.findByPk(req.params.id)
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }

        await Customer.destroy({
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
        const instance = await Customer.findOne({
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

        await Customer.restore({
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
        const instance = await Customer.findOne({
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

        await Customer.destroy({
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

module.exports = {
    getAll,
    getById,
    update,
    destroy,
    restore,
    destroyForce,
}
