const express = require('express')

const router = express.Router()

// controllers
const {
    getAll,
    getById,
    create,
    update,
    destroy,
} = require('~/controllers/v1/product')

// validators
const { authenticateToken } = require('~/middlewares/verify-token')
const validate = require('~/middlewares/validate')
const productSchema = require('~/validators/product')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', authenticateToken, validate(productSchema.create), create)

router.put('/:id', authenticateToken, validate(productSchema.update), update)

router.delete('/:id', authenticateToken, destroy)

module.exports = router
