// models
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')

const getByProductId = async (req, res, next) => {
   try {
      const images = await ProductImage.findAll({
         where: { productId: req.params.productId },
      })
      if (!images) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      res.status(200).json({
         status: 200,
         data: images,
      })
   } catch (error) {
      next(error)
   }
}

const createByProductId = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.productId)
      if (!product) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      const imageRecords = req.body.images.map(image => ({
         path: image.path,
         productId: req.params.productId,
      }))

      const images = await ProductImage.bulkCreate(imageRecords)

      res.status(200).json({
         status: 200,
         data: images,
      })
   } catch (error) {
      next(error)
   }
}

const destroyByProductId = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.productId)
      if (!product) {
         res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      await ProductImage.destroy({
         where: { productId: req.params.productId },
      })

      res.status(200).json({
         status: 200,
      })
   } catch (err) {
      next(err)
   }
}

const destroy = async (req, res, next) => {
   try {
      const image = await ProductImage.findByPk(req.params.id)
      if (!image) {
         res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      await ProductImage.destroy({
         where: { id: req.params.id },
         returning: true,
         plain: true,
      })

      res.status(200).json({
         status: 200,
      })
   } catch (err) {
      next(err)
   }
}

const update = async (req, res, next) => {
   try {
      const image = await ProductImage.findByPk(req.params.id)

      if (!image) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      image.path = req.body.path
      await image.save()

      res.status(200).json({
         status: 200,
         data: image,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getByProductId,
   createByProductId,
   destroyByProductId,
   destroy,
   update,
}
