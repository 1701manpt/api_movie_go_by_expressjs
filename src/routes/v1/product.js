const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    create,
    update,
    destroy,
} = require('~/controllers/v1/product')
const { authorizeToken } = require('~/middlewares/verify-token')
const validate = require('~/middlewares/validate')
const productSchema = require('~/validators/product')

// all
router.get('/', getAll)
router.get('/:id', getById)

// admin
router.post('/', authorizeToken([1]), validate(productSchema.create), create)
router.put('/:id', authorizeToken([1]), validate(productSchema.update), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
