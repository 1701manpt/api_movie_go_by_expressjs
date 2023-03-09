require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = user =>
    jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' })

const generateRefreshToken = user =>
    jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
    })

const generateTokenRegister = user =>
    jwt.sign(user, process.env.REGISTER_TOKEN_SECRET, {
        expiresIn: '10m',
    })

module.exports = { generateToken, generateRefreshToken, generateTokenRegister }
