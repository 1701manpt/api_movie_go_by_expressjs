function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            // const errors = error.details.reduce((acc, cur) => {
            //    acc[cur.path[0]] = cur.message
            //    return acc
            // }, {})
            return res
                .status(400)
                .json({ errors: { validations: error.details } })
        }

        return next()
    }
}

module.exports = validate
