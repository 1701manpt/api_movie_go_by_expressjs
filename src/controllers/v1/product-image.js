const ProductImage = require('~/models/product-image')

const destroy = async (req, res, next) => {
    try {
        const image = await ProductImage.findByPk(req.params.id)
        if (!image) {
            res.status(404).json({
                status: 404,
                message: 'Not Found',
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
                message: 'Not Found',
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
    destroy,
    update,
}
