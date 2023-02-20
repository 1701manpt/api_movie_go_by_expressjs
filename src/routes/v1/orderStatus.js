const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../../controllers/v1/orderStatus')
const { authenticateToken } = require('../../middlewares/verifyToken')

router.get('/', authenticateToken, getAll)
router.get('/:id', authenticateToken, getById)

module.exports = router
