// modal
const Customer = require('~/models/customer')
const Order = require('~/models/order')

const getAll = async (req, res, next) => {
    try {
        const list = await Customer.findAll()

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
        const customer = await Customer.findOne()

        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
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
                message: '404 Not Found',
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
                message: '404 Not Found',
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
                message: '404 Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
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
                message: '404 Not Found',
            })
        }

        if (instance.deleted_at == null) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
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

const getAllOrder = async (req, res, next) => {
    try {
        const instance = await Order.findAll({
            where: { customerId: req.params.id },
        })
        if (!instance) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: instance,
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
    getAllOrder,
}
