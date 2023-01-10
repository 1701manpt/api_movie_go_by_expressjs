const express = require('express')
const router = express.Router()

// validators
const checkId = require('../validators/checkId')

// middleware
const logValidation = require('../middlewares/validate')
const { authenticateToken, authorizeToken } = require('../middlewares/verifyToken')

// controllers
const { getAll, getById, update, destroy, restore, destroyForce, getAllOrder } = require('../controllers/customer')

router.get('/', authorizeToken, getAll)
router.get('/:id/orders', authenticateToken, getAllOrder)
router.get('/:id', authenticateToken, checkId, logValidation, getById)

router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router