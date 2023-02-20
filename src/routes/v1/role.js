const express = require('express')
const router = express.Router()

// controllers
const { getAll } = require('../../controllers/v1/role')
const { authorizeToken } = require('../../middlewares/verify-token')

router.get('/', authorizeToken, getAll)

module.exports = router
