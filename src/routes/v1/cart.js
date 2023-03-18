const express = require('express')
const router = express.Router()
const { getAll, getById, create, destroy } = require('~/controllers/v1/cart')
const { authorizeToken } = require('~/middlewares/verify-token')

// admin customer
router.get('/', authorizeToken([1, 2]), getAll)
router.get('/:id', authorizeToken([1, 2]), getById)

// customer
router.post('/', authorizeToken([2]), create)
router.delete('/:id', authorizeToken([2]), destroy)

module.exports = router
