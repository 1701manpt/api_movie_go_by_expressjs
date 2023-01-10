const Role = require("../models/Role")
const display = require("../utils/display")

const getAll = async (req, res, next) => {
    try {
        const list = await Role.findAll()

        res.status(200).json(display({
            message: 'Lấy danh sách chức vụ thành công',
            data: list
        }))
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll }