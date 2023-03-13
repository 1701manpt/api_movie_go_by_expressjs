const express = require('express')

const router = express.Router()

// controllers
const { getAll, getById, create, destroy, update } = require('~/controllers/v1/movie')
const { authorizeToken } = require('~/middlewares/verify-token')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', authorizeToken([1]), create)
router.put('/:id', authorizeToken([1]), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
