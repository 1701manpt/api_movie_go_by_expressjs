const express = require('express')
const router = express.Router()
const { getAll } = require('~/controllers/v1/role')
const { authorizeToken } = require('~/middlewares/verify-token')

router.get('/', authorizeToken([1]), getAll)

module.exports = router
