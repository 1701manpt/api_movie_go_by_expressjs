const express = require('express')

const router = express.Router()

// controllers
const { getAll, getById } = require('~/controllers/v1/order-status')
const { authenticateToken } = require('~/middlewares/verify-token')

router.get('/', authenticateToken, getAll)
router.get('/:id', authenticateToken, getById)

module.exports = router
