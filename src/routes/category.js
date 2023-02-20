const express = require('express')
const router = express.Router()

// controllers
const {
   getAll,
   getById,
   create,
   update,
   destroy,
   getProductsByCategory,
} = require('../controllers/category')

// verify
const { authorizeToken } = require('../middlewares/verifyToken')

router.get('/', getAll)
router.get('/:id', getById)
router.get('/:id/products', getProductsByCategory)

router.post('/', authorizeToken, create)

router.put('/:id', authorizeToken, update)

router.delete('/:id', authorizeToken, destroy)

module.exports = router
