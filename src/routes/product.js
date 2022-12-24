const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, restore, destroyForce } = require('../controllers/product')

// validators
const logValidation = require('../middlewares/validate')
const { checkCreate, checkId } = require('../validators/product')

router.get('/', getAll)
router.get('/:id', checkId, logValidation, getById)

router.post('/', checkCreate, logValidation, create)
router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, checkCreate, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router