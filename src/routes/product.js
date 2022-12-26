const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, restore, destroyForce } = require('../controllers/product')

// validators
const logValidation = require('../middlewares/validate')
const { checkCreate, checkUpdate } = require('../validators/product')
const checkId = require('../validators/checkId')

router.get('/', getAll)
router.get('/:id', checkId, logValidation, getById)

router.post('/', checkCreate, logValidation, create)
router.post('/:id', checkId, logValidation, restore)

router.put('/:id', checkId, checkUpdate, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)
router.delete('/:id/destroy', checkId, logValidation, destroyForce)

module.exports = router