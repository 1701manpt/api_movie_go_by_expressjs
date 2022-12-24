const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, getProductsByCategory } = require('../controllers/category')

// validators
const checkId = require('../validators/checkId')
const { checkCreate } = require('../validators/category')

// middlewares
const logValidation = require('../middlewares/validate')

// verify
const { authenticateToken } = require('../middlewares/verifyToken')

router.get('/', getAll)
router.get('/:id', checkId, logValidation, getById)
router.get('/:id/products', checkId, logValidation, getProductsByCategory)

router.post('/', authenticateToken, checkCreate, logValidation, create)

router.put('/:id', authenticateToken, checkId, checkCreate, logValidation, update)

router.delete('/:id', authenticateToken, checkId, logValidation, destroy)

module.exports = router