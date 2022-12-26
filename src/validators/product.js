const { body } = require('express-validator')

const checkCreate = [
    body('name')
        .not().isEmpty().withMessage('Tên sản phẩm không được bỏ trống'),
    body('price')
        .not().isEmpty().withMessage('Giá bán không bỏ trống')
        .isNumeric().withMessage('Giá bán không khớp định dạng')
]

const checkUpdate = [
    // body('name')
    //     .not().isEmpty().withMessage('Tên sản phẩm không được bỏ trống'),
    // body('price')
    //     .not().isEmpty().withMessage('Giá bán không bỏ trống')
    //     .isNumeric().withMessage('Giá bán không khớp định dạng')
]

module.exports = {
    checkUpdate,
    checkCreate,
}