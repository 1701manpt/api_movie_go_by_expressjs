const express = require('express')
const router = express.Router()
const {
    loginCustomer,
    loginAdmin,
    registerCustomer,
    refreshToken,
    logout,
} = require('~/controllers/v1/auth')
const { authenticateToken } = require('~/middlewares/verify-token')

// all
router.post('/login/customer', loginCustomer)
router.post('/login/admin', loginAdmin)
router.post('/register/customer', registerCustomer)
router.post('/refresh', refreshToken)

// authentication
router.post('/logout', authenticateToken, logout)

module.exports = router
