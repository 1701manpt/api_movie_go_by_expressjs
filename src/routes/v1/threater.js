const express = require('express')

const router = express.Router()

// controllers
const { getAll, getById, create, destroy } = require('~/controllers/v1/threater')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.delete('/:id', destroy)

module.exports = router
