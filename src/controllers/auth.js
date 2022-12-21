const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Customer = require('../models/customer')
const display = require('../utils/display')
require('dotenv').config()


const { generateAccessToken, generateRefreshToken, generateTokenRegister } = require("../utils/generateToken")
const AccountStatus = require('../models/accountStatus')

const login = async (req, res, next) => {
    try {
        const instanceCheck = await Customer.findOne({
            where: { account: req.body.account },
            include: 'accountStatus'
        })

        if (!instanceCheck) {
            return next(display(400, 'Tài khoản không tồn tại'))
        }

        if (instanceCheck.password !== req.body.password) {
            return next(display(400, 'Mật khẩu không khớp'))
        }

        if (instanceCheck.accountStatus.code === 1) {
            return next(display(400, 'Tài khoản chưa xác thực'))
        }

        const instanceDisplay = await Customer.findByPk(instanceCheck.id, {
            include: 'accountStatus',
            attributes: {
                exclude: 'password'
            }
        })

        const accessToken = generateAccessToken({
            id: instanceCheck.id,
            roleId: 1
        })

        const refreshToken = generateRefreshToken({
            id: instanceCheck.id,
            roleId: 1
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        const data = {
            id: instanceDisplay.id,
            account: instanceDisplay.account,
            fullName: instanceDisplay.fullName,
            accessToken
        }

        res.json(display(200, 'Đăng nhập thành công', 1, data))
    } catch (err) {
        next(err)
    }
}

const register = async (req, res, next) => {
    try {
        const instanceCheck = await Customer.findOne({ where: { account: req.body.account }, paranoid: false })
        if (instanceCheck) {
            return next(display(400, 'Tài khoản đã tồn tại'))
        }

        const newInstance = await Customer.create({
            account: req.body.account,
            password: req.body.password,
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            accountStatusId: 1,
        })

        const confirmationCode = generateTokenRegister({ id: newInstance.id, roleId: 1 })

        res.json(display(200, 'Tài khoản tạo thành công', newInstance && 1, newInstance))

        req.confirmationCode = confirmationCode
        return next()  // go to sendMail
    } catch (err) {
        next(err)
    }
}

const verifyRegister = (req, res, next) => {
    try {
        const confirmationCode = req.params.confirmationCode

        jwt.verify(confirmationCode, process.env.REGISTER_TOKEN_SECRET, async (err, user) => {

            const instanceCheck = await Customer.findByPk(user?.id, {
                include: 'accountStatus'
            })

            if (instanceCheck && instanceCheck?.accountStatusId !== 1) {
                return res.status(404).send('Not found 404')
            }

            if (err) {
                return res.status(400).send('Time verified expired');
            }

            const [result, newInstance] = await Customer.update({
                accountStatusId: 2,
            }, {
                where: { id: user.id },
                returning: true,
                plain: true,
                attributes: {
                    exclude: ['password']
                }
            })

            return res.status(200).send('User verified successfully')
        })
    } catch (err) {
        next(err)
    }
}

const requestRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.json(display(400, 'Refresh Token is required'))
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if (err) {
            return res.json(display(400, 'Refresh Token is invalid or expired', 0, '', err))
        }

        const newAccessToken = generateAccessToken({ id: user.id, roleId: user.roleId })
        const newRefreshToken = generateRefreshToken({ id: user.id, roleId: user.roleId })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        return res.json(display(200, 'Refresh token successfully', 1, { accessToken: newAccessToken }))
    })
}

const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json(display(200, 'Logged out successfully'))
}

module.exports = { requestRefreshToken, login, register, logout, verifyRegister }