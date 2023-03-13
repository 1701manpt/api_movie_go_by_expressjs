const express = require('express')

const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy } = require('~/controllers/v1/order')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', destroy)

module.exports = router
