require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (account) => {
    return jwt.sign(account, process.env.TOKEN_SECRET, { expiresIn: '60s' });
}

module.exports = generateAccessToken