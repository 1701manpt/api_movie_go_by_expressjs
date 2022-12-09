const express = require('express')
const router = express.Router()

const customer = require('../customer')

router.use('/customers', (req, res, next) => {
    res.send('Customers version 1')
})

module.exports = router