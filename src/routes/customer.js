const express = require('express')
const router = express.Router()

// validate
const { checkId, checkCreate, checkSignIn } = require('../validators/customer')

// middleware
const logValidation = require('../middlewares/validation')
const sendMail = require('../middlewares/sendMail')
const { authenticateToken, authorizeToken } = require('../middlewares/verifyToken')

// controllers
const { getAll, getById, create, update, destroy, restore, destroyForce, getAllOrder } = require('../controllers/customer')

router.get('/', getAll)
router.get('/:id/orders', authenticateToken, getAllOrder)
router.get('/:id', checkId, logValidation, authenticateToken, getById)

router.post('/', checkCreate, logValidation, create)
router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router