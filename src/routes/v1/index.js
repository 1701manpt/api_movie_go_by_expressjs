const express = require('express')
const router = express.Router()

const customer = require('../customer')

router.use('/', (req, res, next) => {
    res.send('Version 1')
})

module.exports = router