const express = require('express')
const router = express.Router()

// controllers
const { getAll } = require('../controllers/role')
const { authorizeToken } = require('../middlewares/verifyToken')

router.get('/', authorizeToken, getAll)

module.exports = router
