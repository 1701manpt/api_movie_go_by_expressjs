require('module-alias/register')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const route = require('~/routes')
const delDataAndSyncModel = require('~/tools/sync')
const chat = require('./chat')

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

chat()

// delete data in db and sync with model
// delDataAndSyncModel()

const server = app.listen(7000, err => {
    if (err) {
        console.error(`Listening on port 7000 error: ${err}`)
    } else {
        console.log(`Rest API: ${`http://localhost:${server.address().port}/api/v1.0.0/`}`)
    }
})
