const express = require('express')
const router = express.Router()

// controllers
const { login, loginAdmin, register } = require('../../controllers/v1/auth')

router.post('/login', login)
router.post('/login/admin', loginAdmin)
router.post('/register', register)

module.exports = router
