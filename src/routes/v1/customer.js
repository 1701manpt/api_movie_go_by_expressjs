const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    update,
    destroy,
    restore,
    destroyForce,
} = require('~/controllers/v1/customer')
const { authorizeToken } = require('~/middlewares/verify-token')

// admin
router.get('/', authorizeToken([1]), getAll)
router.delete('/:id/destroy', authorizeToken([1]), destroyForce)

// customer
router.post('/:id', authorizeToken([2]), restore)
router.delete('/:id', authorizeToken([2]), destroy)

// admin customer
router.get('/:id', authorizeToken([1, 2]), getById)
router.put('/:id', authorizeToken([1, 2]), update)

module.exports = router
