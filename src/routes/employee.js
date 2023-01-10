const express = require('express')
const router = express.Router()

// validators
const checkId = require('../validators/checkId')
const { checkCreate } = require('../validators/employee')

// middleware
const logValidation = require('../middlewares/validate')

// controllers
const { getAll, getById, update, destroy, restore, destroyForce, create } = require('../controllers/employee')
const { authenticateToken, authorizeToken } = require('../middlewares/verifyToken')

router.get('/', authorizeToken, getAll)
router.get('/:id', authorizeToken, checkId, logValidation, getById)

router.post('/', authorizeToken, checkCreate, logValidation, create)
router.post('/:id', authorizeToken, checkId, logValidation, restore)

router.put('/:id', authorizeToken, checkId, logValidation, update)

router.delete('/:id', authorizeToken, checkId, logValidation, destroy)
router.delete('/:id/destroy', authorizeToken, checkId, logValidation, destroyForce)

module.exports = router