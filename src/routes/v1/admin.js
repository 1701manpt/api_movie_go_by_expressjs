const express = require('express')
const router = express.Router()
const { authorizeToken } = require('~/middlewares/verify-token')
const {
    getAll,
    getById,
    update,
    destroy,
    restore,
    destroyForce,
    create,
} = require('~/controllers/v1/admin')

// admin
router.get('/', authorizeToken([1]), getAll)
router.get('/:id', authorizeToken([1]), getById)
router.post('/', authorizeToken([1]), create)
router.post('/:id', authorizeToken([1]), restore)
router.put('/:id', authorizeToken([1]), update)
router.delete('/:id', authorizeToken([1]), destroy)
router.delete('/:id/destroy', authorizeToken([1]), destroyForce)

module.exports = router
