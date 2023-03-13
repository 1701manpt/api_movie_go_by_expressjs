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
    getOrders,
} = require('~/controllers/v1/customer')
const { authorizeToken } = require('~/middlewares/verify-token')

router.get('/', authorizeToken([1]), getAll)

router.get('/:id/orders', getOrders)

router.get('/:id', authorizeToken([1, 2]), getById)

router.post('/:id', restore)

router.put('/:id', update)

router.delete('/:id', destroy)

router.delete('/:id/destroy', destroyForce)

module.exports = router
