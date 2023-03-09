const Cart = require('~/models/cart')
const Product = require('~/models/product')

const getAll = async (req, res, next) => {
    try {
        const list = await Cart.findAll()

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
        const cart = await Cart.findByPk(req.params.id)
        if (!cart) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.body.product_id)
        if (!product) {
            return res.status(404).json({
                status: 400,
                message: '400 Bad Request',
            })
        }

        const cart = await Cart.create({
            customer_id: req.body.customer_id,
        })

        res.status(200).json({
            status: 200,
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}

// const update = async (req, res, next) => {
//    try {
//       const product = await Product.findByPk(req.params.id)
//       if (!product) {
//          return res.status(404).json({
//             status: 404,
//             message: '404 Not Found',
//          })
//       }

//       const [result, newProduct] = await Product.update(
//          {
//             name: req.body?.name,
//             price: req.body?.price,
//             description: req.body?.description,
//             categoryId: req.body?.categoryId,
//             avatar: req.body?.avatar,
//          },
//          {
//             where: { id: req.params.id },
//             returning: true,
//          },
//       )

//       res.status(200).json({
//          status: 200,
//          data: newProduct,
//       })
//    } catch (error) {
//       next(error)
//    }
// }

const destroy = async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id)
        if (!cart) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        const count = await Cart.destroy({
            where: { id: req.params.id },
            returning: true,
        })

        res.status(200).json({
            status: 200,
            count,
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    destroy,
}
