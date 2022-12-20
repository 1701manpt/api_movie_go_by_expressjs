require('dotenv').config()
const jwt = require('jsonwebtoken')
const display = require('../utils/display')

const authenticateToken = (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return next(display(401, 'You are not authenticated'))
    }

    const accessToken = token.split(" ")[1]

    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {

        if (err) {
            return next(display(400, 'Token is invalid or expired', 0, '', err))
        }

        req.user = user

        next()
    })
}

const authorizeToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.roleId === 1) {
            next()
        } else {
            res.json(display(403, 'You are not authorized'))
        }
    })
}

module.exports = { authenticateToken, authorizeToken }