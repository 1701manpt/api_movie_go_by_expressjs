const { validationResult } = require('express-validator')
const display = require('../utils/display')

const logValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(display(400, 'Validation failded', 0, '', errors.array()))
    }
    next()
}

module.exports = logValidation