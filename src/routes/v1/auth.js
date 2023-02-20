const express = require('express')
const router = express.Router()

// controllers
const { login } = require('../../controllers/v1/auth')

router.post('/login', login)

module.exports = router
