const express = require('express')
const router = express.Router()
const {
    loginCustomer,
    loginAdmin,
    registerCustomer,
    refreshToken,
    logout,
} = require('~/controllers/v1/auth')
const validate = require('~/middlewares/validate')
const { authenticateToken } = require('~/middlewares/verify-token')
const authSchema = require('~/validators/auth')

// all
router.post('/login/customer', loginCustomer)
router.post('/login/admin', loginAdmin)
router.post('/register/customer', validate(authSchema.registerCustomer), registerCustomer)
router.post('/refresh', refreshToken)

// authentication
router.post('/logout', authenticateToken, logout)

module.exports = router
