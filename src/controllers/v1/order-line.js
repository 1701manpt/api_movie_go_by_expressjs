const OrderLine = require('~/models/order-line')

const getAll = async (req, res, next) => {
    try {
        const list = await OrderLine.findAll()
        res.json({
            status: 200,
            data: list,
        })
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const orderLine = await OrderLine.findByPk(req.params.id)
        if (!orderLine) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
            })
        }
        res.status(200).json({
            status: 200,
            data: OrderLine,
        })
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        res.json({
            data: 'hâha',
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { getAll, getById, create }
