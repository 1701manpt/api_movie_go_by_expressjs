function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(detail => {
                return {
                    field: detail.context.key,
                    message: detail.message,
                }
            })
            return res.status(400).json({
                status: 400,
                errors: errors,
            })
        }

        return next()
    }
}

module.exports = validate
