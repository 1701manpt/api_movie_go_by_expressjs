const express = require('express')

const router = express.Router()

// controllers
const {
    loginCustomer,
    loginAdmin,
    registerCustomer,
    refreshToken,
    logout
} = require('~/controllers/v1/auth')

router.post('/login/customer', loginCustomer)
router.post('/login/admin', loginAdmin)
router.post('/register/customer', registerCustomer)
router.post('/refresh', refreshToken)
router.post('/logout', logout)

module.exports = router
