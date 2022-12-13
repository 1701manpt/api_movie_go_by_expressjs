const express = require('express')
const route = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const display = require('./utils/display')
const auto = require('./tools/autoInsertDefault')

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

route(app)

// error handler 404
app.use((req, res, next) => {
    next(display(404, 'Not found page'))
})

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(display(
        error.status || 500,
        error.message || 'Internal Server Error',
        0,
        '',
        error.error || ''
    ))
})

// auto()

const server = app.listen(7000, (err) => {
    if (err) {
        console.error('Listening on port 7000 error: ' + err)
    }
    else console.log(`Server listening on port ${'http://localhost:' + server.address().port}`)
})