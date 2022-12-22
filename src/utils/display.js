const snakeCase = require("./snakeCase")

module.exports = ({ message = null, data = null, error = null }) => {
    return {
        message: message,
        data: snakeCase(data),
        error: error,
    }
}