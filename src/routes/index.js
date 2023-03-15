const v100 = require('./v1')
const {
    handle404Error,
    handle500Error,
} = require('~/middlewares/error-handler')

function route(app) {
    // version of the API
    app.use('/api/v1.0.0', v100)

    app.use(handle404Error)
    app.use(handle500Error)
}

module.exports = route
