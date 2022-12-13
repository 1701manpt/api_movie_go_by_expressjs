const { param, body } = require('express-validator')

const checkCreate = [

]

const checkId = [
    param('id')
        .isInt().toInt().withMessage('ID must be a number')
]

module.exports = {

}