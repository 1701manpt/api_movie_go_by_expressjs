const express = require('express')
const router = express.Router()

// middleware
const { authenticateToken, authorizeToken } = require('../middlewares/verifyToken')

// controllers
const {
   getAll,
   getById,
   update,
   destroy,
   restore,
   destroyForce,
   getAllOrder,
} = require('../controllers/customer')

router.get('/', authorizeToken, getAll)
router.get('/:id/orders', authenticateToken, getAllOrder)
router.get('/:id', authenticateToken, getById)

router.post('/:id', restore)

router.put('/:id', update)

router.delete('/:id', destroy)
router.delete('/:id/destroy', destroyForce)

module.exports = router
