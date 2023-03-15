const express = require('express')
const router = express.Router()
const { getAll, getById, create } = require('~/controllers/v1/order-line')
const { authorizeToken } = require('~/middlewares/verify-token')

// admin customer
router.get('/', authorizeToken([1, 2]), getAll)
router.get('/:id', authorizeToken([1, 2]), getById)

// customer
router.post('/', authorizeToken([2]), create)

module.exports = router
