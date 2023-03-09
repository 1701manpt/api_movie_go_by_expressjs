require('dotenv').config()
const jwt = require('jsonwebtoken')
const Customer = require('~/models/customer')
const Employee = require('~/models/employee')
const { generateToken, generateRefreshToken } = require('~/utils/generate-token')
const { hashPassword, comparePassword } = require('~/utils/password')

const loginCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            where: {
                account: req.body.account,
            },
        })

        if (!customer) {
            return res.status(401).json({
                status: 401,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            })
        }

        const isPassword = await comparePassword(req.body.password, customer.password)

        if (customer && !isPassword) {
            return res.status(401).json({
                status: 401,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            })
        }

        const token = generateToken({
            id: customer.id,
        })
        const refreshToken = generateRefreshToken({
            id: customer.id,
        })

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 200,
            data: {
                id: customer.id,
                account: customer.account,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

const loginEmployee = async (req, res, next) => {
    try {
        const admin = await Employee.findOne({
            where: {
                account: req.body.account,
            },
        })

        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            })
        }
        const isPassword = await comparePassword(req.body.password, admin.password)

        if (admin && !isPassword) {
            return res.status(401).json({
                status: 401,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            })
        }

        const token = generateToken({
            id: admin.id,
            role_id: admin.role_id,
        })
        const refreshToken = generateRefreshToken({
            id: admin.id,
            role_id: admin.role_id,
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 200,
            data: {
                id: admin.id,
                account: admin.account,
                role_id: admin.role_id,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

const registerCustomer = async (req, res, next) => {
    try {
        const user = await Customer.findOne({
            where: {
                account: req.body.account,
            },
            paranoid: false,
        })

        if (user) {
            return res.status(400).json({
                status: 400,
                message: 'Tên tài khoản đã tồn tại',
            })
        }

        const password = await hashPassword(req.body.password)

        const customer = await Customer.create({
            full_name: req.body.full_name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            account: req.body.account,
            password,
        })

        res.status(200).json({
            status: 200,
            data: customer,
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        return res.status(401).json({
            status: 401,
            message: 'Đăng nhập để tiếp tục',
        })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Phiên đăng nhập hết hạn',
            })
        }

        const newAccessToken = generateToken({
            id: user.id,
            role_id: user.role_id,
        })
        const newRefreshToken = generateRefreshToken({
            id: user.id,
            role_id: user.role_id,
        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 200,
            data: {
                token: newAccessToken,
            },
        })
    })
}

const logout = (req, res) => {
    res.clearCookie('refresh_token')
    res.status(200).json({
        status: 200,
    })
}

module.exports = {
    loginCustomer,
    loginEmployee,
    registerCustomer,
    refreshToken,
    logout,
}
