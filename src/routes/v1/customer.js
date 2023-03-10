const express = require('express')

const router = express.Router()

// controllers
const {
    getAll,
    getById,
    update,
    destroy,
    restore,
    destroyForce,
    getAllOrder,
} = require('~/controllers/v1/customer')
const { authenticateToken } = require('~/middlewares/verify-token')

// router.get('/', authorizeToken, getAll)
router.get('/', getAll)
router.get('/:id/orders', authenticateToken, getAllOrder)
router.get('/:id', authenticateToken, getById)

router.post('/:id', restore)

router.put('/:id', update)

router.delete('/:id', destroy)
router.delete('/:id/destroy', destroyForce)

module.exports = router
