const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const route = require('./routes')

// tools
const auto = require('./tools/autoInsertDefault')

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(
   bodyParser.urlencoded({
      extended: true,
   }),
)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(cookieParser())

route(app)

const ProductImage = require('./models/ProductImage')

;async () => {
   await ProductImage.findAll()
}

// tự động xóa, tạo database và chèn dữ liệu
// auto()

// const crypto = require('crypto')
// const buf = crypto.randomBytes(64, (err, buf) => {
//     if (err) throw err;
//     console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
// });

const server = app.listen(7000, err => {
   if (err) {
      console.error('Listening on port 7000 error: ' + err)
   } else
      console.log(
         `Server listening on port ${'http://localhost:' + server.address().port + '/api'}`,
      )
})
