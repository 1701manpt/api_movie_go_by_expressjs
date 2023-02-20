const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../controllers/orderStatus')

router.get('/', getAll)
router.get('/:id', getById)

module.exports = router
