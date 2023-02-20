const express = require('express')
const router = express.Router()

// controllers
const {
   getAll,
   getById,
   update,
   destroy,
   restore,
   destroyForce,
   create,
} = require('../controllers/employee')
const { authorizeToken } = require('../middlewares/verify-token')

router.get('/', authorizeToken, getAll)
router.get('/:id', authorizeToken, getById)

router.post('/', authorizeToken, create)
router.post('/:id', authorizeToken, restore)

router.put('/:id', authorizeToken, update)

router.delete('/:id', authorizeToken, destroy)
router.delete('/:id/destroy', authorizeToken, destroyForce)

module.exports = router
