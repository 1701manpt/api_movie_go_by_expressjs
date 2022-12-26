require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require('path')

// models
const Customer = require('../models/customer')
const User = require('../models/User')

// utils
const display = require('../utils/display')
const { generateToken, generateRefreshToken, generateTokenRegister } = require("../utils/generateToken")
const { toHash, toCheck } = require('../utils/password')

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                account: req.body.account,
            },
            include: 'userStatus'
        })

        if (!user) {
            return res.status(400).json(display({
                message: 'Tài khoản không tồn tại',
            }))
        }

        if (user && !toCheck(req.body.password, user.password)) {
            return res.status(400).json(display({
                message: 'Mật khẩu không khớp',
            }))
        }

        // cần bổ sung
        // kiểm tra người dùng là khách hàng

        const token = generateToken({
            id: user.id
        })
        const refreshToken = generateRefreshToken({
            id: user.id,
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        res.status(200).json(display({
            message: 'Đăng nhập thành công',
            data: {
                id: user.id,
                token: token
            }
        }))
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                account: req.body.user.account,
            },
            paranoid: false
        })

        if (user) {
            return res.status(400).json(display({
                message: 'Tài khoản tồn tại'
            }))
        }

        // cần bổ sung
        // kiểm tra email đã sử dụng

        const newCustomer = await Customer.create({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            user: {
                email: req.body.user.email,
                account: req.body.user.account,
                password: toHash(req.body.user.password),
                userStatusId: 1,
            }
        }, {
            include: {
                association: 'user'
            }
        })

        const confirmationCode = generateTokenRegister({
            id: newCustomer.user.id,
        })

        res.status(200).json(display({
            message: 'Đăng ký thành công',
            data: newCustomer,
        }))

        req.body.user.confirmationCode = confirmationCode
        return next()  // go to sendMail
    } catch (error) {
        next(error)
    }
}

const verifyRegister = (req, res, next) => {
    try {
        const confirmationCode = req.params.confirmationCode

        jwt.verify(confirmationCode, process.env.REGISTER_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(400).sendFile(path.join(__dirname + '/../pages/verifyRegister/verifyError.html'))
            }

            await User.update({
                userStatusId: 2,
            }, {
                where: { id: user.id },
            })

            res.status(200).sendFile(path.join(__dirname + '/../pages/verifyRegister/verifySuccess.html'))
        })
    } catch (error) {
        next(error)
    }
}

const requestRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken

    console.log('Refresh Token Client Old: ', refreshToken);

    if (!refreshToken) {
        return res.status(401).json(display({
            message: 'Đăng nhập để tiếp tục',
        }))
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json(display({
                message: 'Phiên đăng nhập hết hạn'
            }))
        }

        const newAccessToken = generateToken({ id: user.id })
        const newRefreshToken = generateRefreshToken({ id: user.id })

        console.log('Refresh Token Client New: ', newRefreshToken);
        console.log('Token Client New: ', newAccessToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        return res.status(200).json(display({
            message: 'Làm mới token thành công',
            data: {
                token: newAccessToken
            }
        }))
    })
}

const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.status(200).json(display({
        message: 'Đăng xuất thành công'
    }))
}

module.exports = { requestRefreshToken, login, register, logout, verifyRegister }