const express = require('express')
const router = express.Router()
const {
    destroy,
    update,
} = require('~/controllers/v1/product-image')
const { authorizeToken } = require('~/middlewares/verify-token')

// all
router.delete('/:id', authorizeToken([1]), destroy)
router.put('/:id', authorizeToken([1]), update)

module.exports = router
