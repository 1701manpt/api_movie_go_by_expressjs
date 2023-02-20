const express = require('express')
const router = express.Router()

// controllers
const {
   requestRefreshToken,
   login,
   loginAdmin,
   register,
   logout,
   verifyRegister,
} = require('../controllers/auth')
const sendMail = require('../middlewares/send-mail')
const { authenticateToken } = require('../middlewares/verify-token')

router.post('/login', login)
router.post('/login/admin', loginAdmin)
router.post('/register', register, sendMail)
router.post('/refresh', requestRefreshToken)
router.post('/logout', authenticateToken, logout)
router.get('/register/verify/:confirmationCode', verifyRegister)

module.exports = router
