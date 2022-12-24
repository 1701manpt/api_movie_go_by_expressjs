const { validationResult } = require('express-validator')
const display = require('../utils/display')

const logValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(display({
            message: 'Lỗi xác thực',
            error: errors.array()
        }))
    }
    return next()
}

module.exports = logValidation