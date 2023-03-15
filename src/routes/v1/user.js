const express = require('express')
const router = express.Router()
const { getAll, getById, update, destroy } = require('~/controllers/v1/user')
const { authorizeToken } = require('~/middlewares/verify-token')

// admin
router.get('/', authorizeToken([1]), getAll)
router.get('/:id', authorizeToken([1]), getById)

// customer
router.put('/:id', authorizeToken([2]), update)
router.delete('/:id', authorizeToken([2]), destroy)

module.exports = router
