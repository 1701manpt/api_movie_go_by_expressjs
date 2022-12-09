const { param, body } = require('express-validator')

const checkCreate = [
    body('account')
        .not().isEmpty().withMessage('Tài khoản không được bỏ trống'),
    body('password')
        .isLength({ min: 5 }).withMessage('Mật khẩu phải dài hơn 5 ký tự')
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    // body('rePassword')
    //     .custom((value, { req }) => {
    //         return (req.body.password === value)
    //     }).withMessage('Mật khẩu không khớp nhau')
]

const checkId = [
    param('id')
        .isInt().toInt().withMessage('ID must be a number')
]

module.exports = {
    checkId,
    checkCreate,
}