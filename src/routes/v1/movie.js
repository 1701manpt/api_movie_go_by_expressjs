const express = require('express')

const router = express.Router()

// controllers
const { getAll, getById, create, destroy, update } = require('~/controllers/v1/movie')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router
