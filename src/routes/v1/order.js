const express = require('express')
const router = express.Router()

// controllers
const {
   getAll,
   getById,
   create,
   update,
   destroy,
   destroyForce,
   restore,
} = require('../../controllers/v1/order')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', create)
router.post('/:id', restore)

router.put('/:id', update)

router.delete('/:id', destroy)
router.delete('/:id/destroy', destroyForce)

module.exports = router
