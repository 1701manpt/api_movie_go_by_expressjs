// modal
const Category = require('../../models/category')
const Product = require('../../models/product')

const getAll = async (req, res, next) => {
   try {
      const list = await Category.findAll()

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
      const category = await Category.findByPk(req.params.id)
      if (!category) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      res.status(200).json({
         status: 'success',
         data: category,
      })
   } catch (error) {
      next(error)
   }
}

const create = async (req, res, next) => {
   try {
      const instance = await Category.findOne({
         where: { name: req.body.name },
      })
      if (instance) {
         return res.status(400).json({
            status: 400,
            message: 'Tên danh mục tồn tại',
         })
      }

      const newCategory = await Category.create({
         name: req.body.name,
         image: req.body.image,
      })

      res.status(200).json({
         status: 200,
         data: newCategory,
      })
   } catch (err) {
      next(err)
   }
}

const update = async (req, res, next) => {
   try {
      const category = await Category.findByPk(req.params.id)
      if (!category) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      const categoryCheckName = await Category.findOne({
         where: {
            name: req.body.name,
         },
      })
      if (categoryCheckName.id != category.id && categoryCheckName) {
         return res.status(400).json({
            status: 400,
            message: 'Tên danh mục tồn tại',
         })
      }

      const [result, newCategory] = await Category.update(
         {
            name: req.body.name,
            image: req.body.image,
         },
         {
            where: { id: req.params.id },
            returning: true,
            plain: true,
         },
      )

      res.status(200).json({
         status: 200,
         data: newCategory,
      })
   } catch (error) {
      next(error)
   }
}

const destroy = async (req, res, next) => {
   try {
      const instance = await Category.findByPk(req.params.id)
      if (!instance) {
         return res.status(404).json({
            status: 404,
            message: '404 Not Found',
         })
      }

      await Category.destroy({
         where: { id: req.params.id },
         returning: true,
         plain: true,
      })

      res.status(200).json({
         status: 200,
      })
   } catch (error) {
      next(error)
   }
}

const getProductsByCategory = async (req, res, next) => {
   const products = await Product.findAll({
      where: { categoryId: req.params.id },
      include: {
         association: 'category',
      },
   })

   res.status(200).json({
      status: 200,
      data: products,
   })
}

module.exports = {
   getAll,
   getById,
   create,
   update,
   destroy,
   getProductsByCategory,
}
