const express = require('express')
const router = express.Router()
const { authorizeToken } = require('~/middlewares/verify-token')
const { getAll, getById, create, update, destroy } = require('~/controllers/v1/category')

// all
router.get('/', getAll)
router.get('/:id', getById)

// admin
router.post('/', authorizeToken([1]), create)
router.put('/:id', authorizeToken([1]), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
