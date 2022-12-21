const { param } = require("express-validator")

const checkId = [
    param('id')
        .isInt().toInt().withMessage('ID must be a number')
]

module.exports = checkId