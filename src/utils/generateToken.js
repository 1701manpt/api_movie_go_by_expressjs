require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1m' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

const generateTokenRegister = (user) => {
    return jwt.sign({ ...user }, process.env.REGISTER_TOKEN_SECRET, { expiresIn: '5m' });
}

module.exports = { generateAccessToken, generateRefreshToken, generateTokenRegister }