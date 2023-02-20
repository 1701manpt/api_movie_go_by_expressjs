const snakeCase = require('./snake-case')

const display = ({ message = null, data = null, error = null }) => {
   return {
      message: message,
      // data: snakeCase(data),
      data: data, // default camel case
      error: error,
   }
}

module.exports = display
