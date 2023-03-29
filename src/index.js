require('module-alias/register') // start with ~/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const route = require('~/routes')
const delDataAndSyncModel = require('~/tools/sync')
const { createServer } = require('http')
const { Server } = require('socket.io')
const createImage = require('~/openai/images/create-image')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    /* options */
    cors: {
        origin: 'http://127.0.0.1:5500',
        credentials: true
    }
})
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

io.on('connection', socket => {
    console.log('A user connected.')

    socket.on('disconnect', () => {
        console.log('A user disconnected.')
    })

    socket.on('chat message', msg => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })

    socket.on('/create-image', async ({ description, size }) => {
        console.log('Mô tả: ' + description)
        console.log('Kích thước: ' + size)
        const data = await createImage({ description, size })
        io.emit('/create-image', { url: data?.data[0]?.url, size })
        console.log('Uri ảnh: ' + data?.data[0]?.url)
    })
})

// delete data in db and sync with model
// delDataAndSyncModel()

const server = httpServer.listen(7000, err => {
    if (err) {
        console.error(`Listening on port 7000 error: ${err}`)
    } else {
        console.log(`Rest API: ${`http://localhost:${server.address().port}/api/v1.0.0/`}`)
    }
})
