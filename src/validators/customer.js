const { param, body } = require('express-validator')

const checkCreate = [
    body('account')
        .not().isEmpty().withMessage('Tài khoản không bỏ trống')
        .isLength({ min: 5, max: 20 }).withMessage('Tài khoản dài từ 5 đến 20 ký tự')
        .isAlphanumeric().withMessage('Tài khoản không chứa ký tự đặc biệt và khoảng trắng'),
    body('password')
        .not().isEmpty().withMessage('Mật khẩu không bỏ trống')
        .isLength({ min: 5, max: 50 }).withMessage('Mật khẩu dài từ 5 đến 50 ký tự'),
    body('confirmPassword')
        .custom((value, { req }) => {
            return (req.body.password === value)
        }).withMessage('Mật khẩu không khớp nhau'),
    body('email')
        .not().isEmpty().withMessage('Email không bỏ trống')
        .isEmail().withMessage('Email không khớp định dạng'),
    body('phone')
        .not().isEmpty().withMessage('Số điện thoại không bỏ trống')
        .isMobilePhone().withMessage('Số điện thoại không khớp định dạng'),
    body('address')
        .not().isEmpty().withMessage('Địa chỉ không bỏ trống')
]

const checkSignIn = [
    body('account')
        .not().isEmpty().withMessage('Tài khoản không bỏ trống'),
    body('password')
        .not().isEmpty().withMessage('Mật khẩu không bỏ trống')
]

const checkId = [
    param('id')
        .isInt().toInt().withMessage('ID must be a number')
]

module.exports = { checkId, checkCreate, checkSignIn }