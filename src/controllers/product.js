// modal
const Category = require('../models/category')
const Product = require('../models/product')
const ProductImage = require('../models/productImage')

// utils
const display = require('../utils/display')

const getAll = async (req, res, next) => {
   try {
      const list = await Product.findAll({
         include: 'category',
      })

      res.status(200).json(
         display({
            message: 'Lấy danh sách sản phẩm thành công',
            data: list,
         }),
      )
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
         return res.status(400).json(
            display({
               message: 'Sản phẩm không tồn tại',
            }),
         )
      }

      const images = await ProductImage.findAll({
         where: {
            productId: product.id,
         },
      })

      res.status(200).json(
         display({
            message: 'Lấy sản phẩm thành công',
            data: {
               product,
               images,
            },
         }),
      )
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
         return res.status(400).json(
            display({
               message: 'Tên sản phẩm tồn tại',
            }),
         )
      }

      if (req.body.categoryId) {
         const category = await Category.findOne({
            where: { id: req.body.categoryId },
         })
         if (!category) {
            return res.status(400).json(
               display({
                  message: 'Danh mục không tồn tại',
               }),
            )
         }
      }

      const newProduct = await Product.create({
         avatar: req.body?.avatar,
         name: req.body?.name,
         price: req.body?.price,
         description: req.body?.description,
         categoryId: req.body?.categoryId,
      })

      req.body.images &&
         req.body.images.map(async (image, i) => {
            await ProductImage.create({
               index: i,
               path: image,
               productId: newProduct.id,
            })
         })

      res.status(200).json(
         display({
            message: 'Tạo sản phẩm thành công',
            data: newProduct,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const update = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
         return res.status(400).json(
            display({
               message: 'Sản phẩm không tồn tại',
            }),
         )
      }

      const productCheckName = await Product.findOne({
         where: {
            name: req.body.name,
         },
      })

      if (productCheckName) {
         return res.status(400).json(
            display({
               message: 'Tên sản phẩm đã tồn tại',
            }),
         )
      }

      const [result, newProduct] = await Product.update(
         {
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            categoryId: req.body?.categoryId,
         },
         {
            where: { id: req.params.id },
            returning: true,
            plain: true,
         },
      )

      res.status(200).json(
         display({
            message: 'Cập nhật sản phẩm thành công',
            data: newProduct,
         }),
      )
   } catch (error) {
      next(error)
   }
}

const destroy = async (req, res, next) => {
   try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
         return res.status(400).json(
            display({
               message: 'Sản phẩm không tồn tại',
            }),
         )
      }

      await Product.destroy({
         where: { id: req.params.id },
         returning: true,
         plain: true,
      })

      res.status(200).json(
         display({
            message: 'Xóa sản phẩm thành công',
         }),
      )
   } catch (err) {
      next(err)
   }
}

module.exports = { getAll, getById, create, update, destroy }
