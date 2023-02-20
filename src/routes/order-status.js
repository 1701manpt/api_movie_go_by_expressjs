const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../controllers/order-status')

router.get('/', getAll)
router.get('/:id', getById)

module.exports = router
