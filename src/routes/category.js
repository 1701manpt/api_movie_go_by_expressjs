const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, getProductsByCategory } = require('../controllers/category')

// validators
const checkId = require('../validators/checkId')
const { checkCreate, checkUpdate } = require('../validators/category')

// middlewares
const logValidation = require('../middlewares/validate')

// verify
const { authenticateToken, authorizeToken } = require('../middlewares/verifyToken')

router.get('/', getAll)
router.get('/:id', checkId, logValidation, getById)
router.get('/:id/products', checkId, logValidation, getProductsByCategory)

router.post('/', authenticateToken, checkCreate, logValidation, create)

router.put('/:id', checkId, checkUpdate, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)

module.exports = router