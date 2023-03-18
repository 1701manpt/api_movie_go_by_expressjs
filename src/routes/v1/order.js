const express = require('express')
const router = express.Router()
const { getAll, getById, create, update, destroy } = require('~/controllers/v1/order')
const validate = require('~/middlewares/validate')
const { authorizeToken } = require('~/middlewares/verify-token')
const orderSchema = require('~/validators/order')

// admin
router.get('/', authorizeToken([1, 2]), getAll)
router.get('/:id', authorizeToken([1, 2]), getById)

// customer
router.post('/', authorizeToken([2]), validate(orderSchema.create), create)
router.put('/:id', authorizeToken([2]), validate(orderSchema.update), update)
router.delete('/:id', authorizeToken([2]), destroy)

module.exports = router
