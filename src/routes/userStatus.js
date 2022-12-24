const express = require('express')
const router = express.Router()

// models
const UserStatus = require('../models/userStatus')

// utils
const display = require('../utils/display')

// middlewares
const logValidation = require('../middlewares/validate')
const checkId = require('../validators/checkId')

router.get('/', async (req, res, next) => {
    try {
        const list = await UserStatus.findAll()

        res.status(200).json(display({
            message: 'Lấy danh sách trạng thái người dùng thành công',
            data: list,
        }))
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', checkId, logValidation, async (req, res, next) => {
    try {
        const instance = await UserStatus.findByPk(req.params.id)
        if (!instance) {
            return res.status(400).json(display({
                message: 'Trạng thái người dùng không tồn tại'
            }))
        }

        res.status(200).json(display({
            message: 'Lấy trạng thái người dùng thành công'
        }))
    }
    catch (error) {
        next(error)
    }
})

module.exports = router