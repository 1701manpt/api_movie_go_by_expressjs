const CartLine = require('~/models/cart-line')

const getAll = async (req, res, next) => {
    try {
        const list = await CartLine.findAll()
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
        const cartLine = await CartLine.findByPk(req.params.id)
        if (!cartLine) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }
        res.status(200).json({
            status: 200,
            data: cartLine,
        })
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const cartLine = CartLine.findAll()
        res.status(200).json({
            data: cartLine,
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { getAll, getById, create }
