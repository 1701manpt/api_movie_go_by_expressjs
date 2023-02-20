const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../../controllers/v1/user')
const { authorizeToken } = require('../../middlewares/verify-token')

router.get('/', authorizeToken, getAll)
router.get('/:id', authorizeToken, getById)

module.exports = router
