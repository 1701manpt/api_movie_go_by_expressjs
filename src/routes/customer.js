const express = require('express')
const router = express.Router()

// validate
const { checkId, checkCreate } = require('../validators/customer')

// middleware
const logValidation = require('../middlewares/validation')
const sendMail = require('../middlewares/sendMail')
const authenticateToken = require('../middlewares/authenticateToken')

// controllers
const { getAll, getById, create, update, destroy, restore, destroyForce, verify, signUp, signIn, getAllOrder } = require('../controllers/customer')

router.get('/', getAll)
router.get('/:id/orders', authenticateToken, getAllOrder)
router.get('/:id', checkId, logValidation, getById)
router.get('/:id/verify/:confirmationCode', verify)

router.post('/', checkCreate, logValidation, create)
router.post('/signUp', checkCreate, logValidation, signUp, sendMail)
router.post('/signIn', signIn)
router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router