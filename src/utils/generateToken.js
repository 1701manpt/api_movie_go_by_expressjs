require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '10s' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

const generateTokenRegister = (user) => {
    return jwt.sign({ ...user }, process.env.REGISTER_TOKEN_SECRET, { expiresIn: '30s' });
}

module.exports = { generateToken, generateRefreshToken, generateTokenRegister }