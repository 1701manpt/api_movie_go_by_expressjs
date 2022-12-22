const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById } = require('../controllers/user')

router.get('/', getAll)
router.get('/:id', getById)

// router.post('/', create)

module.exports = router