const express = require('express')
const router = express.Router()

// controllers
const { requestRefreshToken, login, register, logout, verifyRegister } = require('../controllers/auth')
const sendMail = require('../middlewares/sendMail')
const logValidation = require('../middlewares/validation')
const { authenticateToken } = require('../middlewares/verifyToken')
const { checkCreate, checkSignIn } = require('../validators/customer')

router.post('/login', checkSignIn, logValidation, login)
// router.post('/register', checkCreate, logValidation, register, sendMail)
router.post('/register', register, sendMail)
router.post('/refresh', requestRefreshToken)
// router.post('/logout', authenticateToken, logout)
router.post('/logout', logout)
router.get('/register/verify/:confirmationCode', verifyRegister)

module.exports = router