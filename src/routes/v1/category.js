const express = require('express')
const router = express.Router()
const { authorizeToken } = require('~/middlewares/verify-token')
const { getAll, getById, create, update, destroy } = require('~/controllers/v1/category')
const validate = require('~/middlewares/validate')
const categorySchema = require('~/validators/category')

// all
router.get('/', getAll)
router.get('/:id', getById)

// admin
router.post('/', authorizeToken([1]), validate(categorySchema.create), create)
router.put('/:id', authorizeToken([1]), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
