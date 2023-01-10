const { body } = require('express-validator')

const checkRegister = [
    body('account')
        .not().isEmpty().withMessage('Tài khoản không bỏ trống')
        .isLength({ min: 5, max: 20 }).withMessage('Tài khoản dài từ 5 đến 20 ký tự')
        .isAlphanumeric().withMessage('Tài khoản không chứa ký tự đặc biệt và khoảng trắng'),
    // body('password')
    //     .not().isEmpty().withMessage('Mật khẩu không bỏ trống')
    //     .isLength({ min: 5, max: 50 }).withMessage('Mật khẩu dài từ 5 đến 50 ký tự'),
    body('confirmPassword')
        .custom((value, { req }) => {
            return (req.body.password == value)
        }).withMessage('Mật khẩu không khớp nhau'),
    body('email')
        .not().isEmpty().withMessage('Email không bỏ trống')
        .isEmail().withMessage('Email không khớp định dạng')
]

const checkLogin = [
    body('account')
        .not().isEmpty().withMessage('Tài khoản không bỏ trống'),
    body('password')
        .not().isEmpty().withMessage('Mật khẩu không bỏ trống')
]

module.exports = { checkRegister, checkLogin }