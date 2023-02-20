const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create } = require('../../controllers/v1/orderLine')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', create)

module.exports = router
