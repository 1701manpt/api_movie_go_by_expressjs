const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy, restore, destroyForce } = require('../controllers/orderStatus')

router.get('/', getAll)

router.get('/:id', getById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', destroy)

router.post('/:id', restore)

router.delete('/:id/destroy', destroyForce)

module.exports = router