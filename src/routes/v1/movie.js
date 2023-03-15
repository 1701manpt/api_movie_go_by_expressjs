const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    create,
    destroy,
    update,
} = require('~/controllers/v1/movie')
const { authorizeToken } = require('~/middlewares/verify-token')

// all
router.get('/', getAll)
router.get('/:id', getById)

// admin
router.post('/', authorizeToken([1]), create)
router.put('/:id', authorizeToken([1]), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
