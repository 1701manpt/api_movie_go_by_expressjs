const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, getProductsByCategory } = require('../controllers/category')

// validators
const checkId = require('../validators/checkId')

// middlewares
// const logValidation = require('../middlewares/validation')

router.get('/', getAll)
router.get('/:id', checkId, getById)
router.get('/:id/products', getProductsByCategory)

router.post('/', create)

router.put('/:id', checkId, update)

router.delete('/:id', checkId, destroy)

module.exports = router