const express = require('express')
const router = express.Router()

// controllers
const { requestRefreshToken, login, register, logout, verifyRegister } = require('../controllers/auth')
const sendMail = require('../middlewares/sendMail')
const logValidation = require('../middlewares/validate')
const { authenticateToken } = require('../middlewares/verifyToken')
const { checkRegister, checkLogin } = require('../validators/customer')

router.post('/login', checkLogin, logValidation, login)
router.post('/register', checkRegister, logValidation, register, sendMail)
router.post('/refresh', requestRefreshToken)
router.post('/logout', authenticateToken, logout)
router.get('/register/verify/:confirmationCode', verifyRegister)

module.exports = router