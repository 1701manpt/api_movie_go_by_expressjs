const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    create,
    destroy,
} = require('~/controllers/v1/threater')
const { authorizeToken } = require('~/middlewares/verify-token')

router.get('/', authorizeToken([1]), getAll)
router.get('/:id', authorizeToken([1]), getById)
router.post('/', authorizeToken([1]), create)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
