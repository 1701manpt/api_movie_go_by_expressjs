const customer = require('./customer')
const product = require('./product')
const order = require('./order')
const orderLine = require('./orderLine')
const orderStatus = require('./orderStatus')
const accountStatus = require('./accountStatus')

const version1 = require('./v1/index')

function route(app) {

    // default
    app.use('/api/customers', customer)
    app.use('/api/products', product)
    app.use('/api/orders', order)
    app.use('/api/orderLines', orderLine)
    app.use('/api/orderStatuses', orderStatus)
    app.use('/api/accountStatuses', accountStatus)

    // version of the API
    app.use('/api/v1', version1)
}

module.exports = route