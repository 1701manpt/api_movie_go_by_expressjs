require('dotenv').config()
const jwt = require('jsonwebtoken')
const display = require('../utils/display')

const authenticateToken = (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.status(401).json(display({
            message: 'Đăng nhập để tiếp tục'
        }))
    }

    const accessToken = token.split(" ")[1]

    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {

        if (err) {
            return res.status(401).json(display({
                message: 'Token hết hạn, hoặc không hợp lệ',
                error: err
            }))
        }

        req.user = user

        next()
    })
}

const authorizeToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.roleId) {
            next()
        } else {
            res.status(403).json(display({
                message: 'Người dùng không có quyền truy cập'
            }))
        }
    })
}

module.exports = { authenticateToken, authorizeToken }