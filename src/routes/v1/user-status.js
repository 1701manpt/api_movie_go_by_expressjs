const express = require('express')

const router = express.Router()

// models
const UserStatus = require('~/models/user-status')

router.get('/', async (req, res, next) => {
    try {
        const list = await UserStatus.findAll()

        res.status(200).json({
            status: 200,
            data: list,
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const status = await UserStatus.findByPk(req.params.id)
        if (!status) {
            return res.status(404).json({
                status: 404,
                message: '404 Not Found',
            })
        }

        res.status(200).json({
            status: 200,
            data: status,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router
