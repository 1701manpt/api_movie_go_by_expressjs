const express = require('express')
const { authorizeToken } = require('~/middlewares/verify-token')

const router = express.Router()

// controllers
const {
    getAll,
    getById,
    create,
    update,
    destroy,
    getProductsByCategory,
} = require('~/controllers/v1/category')

router.get('/', getAll)
router.get('/:id', getById)
router.get('/:id/products', getProductsByCategory)

router.post('/', authorizeToken, create)

router.put('/:id', authorizeToken, update)

router.delete('/:id', authorizeToken, destroy)

module.exports = router
