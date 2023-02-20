const express = require('express')
const router = express.Router()

// controllers
const {
   getByProductId,
   createByProductId,
   destroyByProductId,
   destroy,
   update,
} = require('../../controllers/v1/product-image')
const validate = require('../../middlewares/validate')
const imagesSchema = require('../../validators/product-image')

router.get('/product/:productId', getByProductId)
router.post('/product/:productId', validate(imagesSchema), createByProductId)
router.delete('/product/:productId', destroyByProductId)
router.delete('/:id', destroy)
router.put('/:id', update)

module.exports = router
