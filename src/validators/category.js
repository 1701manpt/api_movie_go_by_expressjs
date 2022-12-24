const { body } = require('express-validator')

const checkCreate = [
    body('name')
        .not().isEmpty().withMessage('Tên danh mục không được bỏ trống'),
]

module.exports = {
    checkCreate,
}