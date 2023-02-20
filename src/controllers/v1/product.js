// modal
const Category = require('../../models/category')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')

const getAll = async (req, res, next) => {
   try {
      const list = await Product.findAll({
         include: 'category',
      })

      res.status(200).json({
         status: 200,
         data: list,
      })
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id, {
         include: ['category'],
      })
      if (!product) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      const images = await ProductImage.findAll({
         where: {
            productId: product.id,
         },
      })

      res.status(200).json({
         status: 200,
         data: {
            product,
            images,
         },
      })
   } catch (error) {
      next(error)
   }
}

const create = async (req, res, next) => {
   try {
      const product = await Product.findOne({
         where: { name: req.body.name },
         paranoid: false,
      })
      if (product) {
         return res.status(400).json({
            status: 400,
            message: 'Tên sản phẩm tồn tại',
         })
      }

      if (req.body.categoryId) {
         const category = await Category.findOne({
            where: { id: req.body.categoryId },
         })
         if (!category) {
            return res.status(400).json({
               status: 400,
               message: 'Danh mục không tồn tại',
            })
         }
      }

      const newProduct = await Product.create({
         avatar: req.body?.avatar,
         name: req.body?.name,
         price: req.body?.price,
         description: req.body?.description,
         categoryId: req.body?.categoryId,
      })

      res.status(200).json({
         status: 200,
         data: newProduct,
      })
   } catch (error) {
      next(error)
   }
}

const update = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      const [result, newProduct] = await Product.update(
         {
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            categoryId: req.body?.categoryId,
            avatar: req.body?.avatar,
         },
         {
            where: { id: req.params.id },
            returning: true,
         },
      )

      res.status(200).json({
         status: 200,
         data: newProduct,
      })
   } catch (error) {
      next(error)
   }
}

const destroy = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      await Product.destroy({
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

module.exports = { getAll, getById, create, update, destroy }
