const Joi = require('joi')

const imagesSchema = Joi.object({
    images: Joi.array()
        .items(
            Joi.object({
                path: Joi.string().uri().required(),
            }),
        )
        .min(1)
        .max(8),
})

module.exports = imagesSchema
