function handle404Error(req, res, next) {
    res.status(404).json({
        status: 404,
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.url}`,
    })
    next()
}

function handle500Error(error, req, res, next) {
    console.error(error.stack)
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: 'Internal Server Error',
        error_msg: error.message || error.msg || null,
    })
    next()
}

module.exports = {
    handle404Error,
    handle500Error,
}
