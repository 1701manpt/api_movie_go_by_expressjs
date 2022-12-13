require('dotenv').config()
const jwt = require('jsonwebtoken')
const display = require('../utils/display')

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return next(display(401, 'Token missing from request'))
    }

    jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
        if (err) {
            return next(display(403, 'Token expired'))
        }

        req.user = user

        next()
    })
}

module.exports = authenticateToken