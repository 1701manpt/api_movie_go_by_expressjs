const express = require('express')
const router = express.Router()

// validators
const checkId = require('../validators/checkId')
const { checkCreate } = require('../validators/employee')

// middleware
const logValidation = require('../middlewares/validate')

// controllers
const { getAll, getById, update, destroy, restore, destroyForce, create } = require('../controllers/employee')

router.get('/', getAll)
router.get('/:id', checkId, logValidation, getById)

router.post('/', checkCreate, logValidation, create)
router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router