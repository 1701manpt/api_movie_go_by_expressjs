const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const route = require('./routes')

// utils
const display = require('./utils/display')

// tools
const auto = require('./tools/autoInsertDefault')

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(cookieParser())

route(app)

// error handler 404
app.use('/', (req, res, next) => {
    return res.status(404).sendFile(path.join(__dirname + '/./pages/404.html'))
})

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(display({
        error: error.error,
        message: error.message || 'Internal Server Error'
    }))
})

const Employee = require('./models/Employee')
const ProductImage = require('./models/ProductImage')

async () => {
    await Employee.findAll()
    await ProductImage.findAll()
}

// tự động tạo database và chèn dữ liệu
// auto()

const server = app.listen(7000, (err) => {
    if (err) {
        console.error('Listening on port 7000 error: ' + err)
    }
    else console.log(`Server listening on port ${'http://localhost:' + server.address().port + '/api'}`)
})