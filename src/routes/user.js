const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../controllers/user')
const { authorizeToken } = require('../middlewares/verifyToken')

router.get('/', authorizeToken, getAll)
router.get('/:id', authorizeToken, getById)

// router.post('/', create)

module.exports = router
