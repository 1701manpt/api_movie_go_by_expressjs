const { param, body } = require('express-validator')

const checkCreate = [
    body('name')
        .not().isEmpty().withMessage('Tên sản phẩm không được bỏ trống'),
    body('price')
        .not().isEmpty().withMessage('Giá bán không bỏ trống')
        .isNumeric().withMessage('Giá bán không khớp định dạng')
]

const checkId = [
    param('id')
        .isInt().toInt().withMessage('ID must be a number')
]

module.exports = {
    checkId,
    checkCreate,
}