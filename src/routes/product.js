const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy } = require('../controllers/product')

// validators
const { authenticateToken } = require('../middlewares/verify-token')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', authenticateToken, create)

router.put('/:id', authenticateToken, update)

router.delete('/:id', authenticateToken, destroy)

module.exports = router
