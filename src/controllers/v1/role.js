const Role = require('~/models/role')

const getAll = async (req, res, next) => {
    try {
        const list = await Role.findAll()

        res.status(200).json({
            status: 200,
            data: list,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll }
