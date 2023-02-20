const customer = require('./customer')
const employee = require('./employee')
const user = require('./user')
const role = require('./role')
const category = require('./category')
const product = require('./product')
const order = require('./order')
const orderLine = require('./order-line')
const orderStatus = require('./order-status')
const userStatus = require('./user-status')
const auth = require('./auth')

const version1 = require('./v1')

function route(app) {
   // default
   app.use('/api/customers', customer)
   app.use('/api/employees', employee)
   app.use('/api/users', user)
   app.use('/api/roles', role)
   app.use('/api/categories', category)
   app.use('/api/products', product)
   app.use('/api/orders', order)
   app.use('/api/order-lines', orderLine)
   app.use('/api/order-statuses', orderStatus)
   app.use('/api/user-statuses', userStatus)
   app.use('/api/auth', auth)

   // version of the API
   app.use('/api/v1', version1)

   // Handle 404 error
   app.use((req, res, next) => {
      const error = new Error('404 Not Found')
      error.status = 404
      next(error)
   })

   // Handle other errors
   app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.json({
         status: err.status || 500,
         message: err.message,
      })
   })
}

module.exports = route
