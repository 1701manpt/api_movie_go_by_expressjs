const express = require('express')
const router = express.Router()
const { getAll, getById } = require('~/controllers/v1/order-status')
const { authorizeToken } = require('~/middlewares/verify-token')

router.get('/', authorizeToken([1, 2]), getAll)
router.get('/:id', authorizeToken([1, 2]), getById)

module.exports = router
