const Joi = require('joi')

const imagesSchema = Joi.object({
   images: Joi.array()
      .items(
         Joi.object({
            path: Joi.string().uri().required().messages({
               'string.empty': 'Image path must not be empty',
               'string.uri': 'Image path must be a valid URL',
            }),
         }),
      )
      .max(8)
      .required()
      .messages({
         'array.base': 'Images must be an array',
         'array.max': 'You can upload up to {#limit} images only',
         'object.base': 'Invalid image format',
      }),
})

module.exports = imagesSchema
