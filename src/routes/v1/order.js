const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    create,
    update,
    destroy,
} = require('~/controllers/v1/order')
const { authorizeToken } = require('~/middlewares/verify-token')

// admin
router.get('/', authorizeToken([1, 2]), getAll)
router.get('/:id', authorizeToken([1, 2]), getById)

// customer
router.post('/', authorizeToken([2]), create)
router.put('/:id', authorizeToken([2]), update)
router.delete('/:id', authorizeToken([2]), destroy)

module.exports = router
