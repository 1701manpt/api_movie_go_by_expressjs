require('dotenv').config()
const jwt = require('jsonwebtoken')
const Customer = require('~/models/customer')
const { generateToken, generateRefreshToken } = require('~/utils/generate-token')
const { hashPassword, comparePassword } = require('~/utils/password')
const User = require('~/models/user')
const Admin = require('~/models/admin')

const loginCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            include: {
                as: 'user',
                model: User,
                where: {
                    account: req.body.account,
                },
            },
        })

        if (!customer) {
            return res.status(401).json({
                status: 401,
                message: 'Thông tin đăng nhập sai',
            })
        }

        const user = customer.user

        const isPassword = await comparePassword(req.body.password, user.password)

        if (user && !isPassword) {
            return res.status(401).json({
                status: 401,
                message: 'Thông tin đăng nhập sai',
            })
        }

        const token = generateToken({
            id: user.id,
            role_id: user.role_id,
        })
        const refreshToken = generateRefreshToken({
            id: user.id,
            role_id: user.role_id,
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
                id: user.id,
                role_id: user.role_id,
                account: user.account,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

const loginAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            include: {
                as: 'user',
                model: User,
                where: {
                    account: req.body.account,
                },
            },
        })

        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: 'Thông tin đăng nhập sai',
            })
        }

        const user = admin.user

        const isPassword = await comparePassword(req.body.password, user.password)

        if (user && !isPassword) {
            return res.status(401).json({
                status: 401,
                message: 'Thông tin đăng nhập sai',
            })
        }

        const token = generateToken({
            id: user.id,
            role_id: user.role_id,
        })
        const refreshToken = generateRefreshToken({
            id: user.id,
            role_id: user.role_id,
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
                id: user.id,
                role_id: user.role_id,
                account: user.account,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

const registerCustomer = async (req, res, next) => {
    try {
        const userCheckEmail = await User.findOne({
            where: {
                email: req.body.email,
            },
        })

        const userCheckAccount = await User.findOne({
            where: {
                email: req.body.account,
            },
        })

        const userCheckPhoneNumber = await User.findOne({
            include: {
                as: 'customer',
                model: Customer,
                where: {
                    phone_number: req.body.phone_number,
                },
            },
        })

        if (userCheckEmail) {
            return res.status(400).json({
                status: 400,
                message: 'Email đã sử dụng',
            })
        }

        if (userCheckPhoneNumber) {
            return res.status(400).json({
                status: 400,
                message: 'Phone Number đã sử dụng',
            })
        }

        if (userCheckAccount) {
            return res.status(400).json({
                status: 400,
                message: 'Account đã sử dụng',
            })
        }

        const password = await hashPassword(req.body.password)
        const customer = await Customer.create(
            {
                full_name: req.body?.full_name,
                address: req.body?.address,
                phone_number: req.body.phone_number,
                user: {
                    email: req.body.email,
                    account: req.body.account,
                    password: password,
                    status_id: 1,
                    role_id: 2,
                },
            },
            {
                include: {
                    as: 'user',
                    model: User,
                },
            },
        )

        res.status(200).json({
            status: 200,
            data: customer,
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies['refresh_token']

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

        res.cookie('refresh_token', newRefreshToken, {
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
        message: 'Đăng xuất thành công',
    })
}

module.exports = {
    loginCustomer,
    loginAdmin,
    registerCustomer,
    refreshToken,
    logout,
}
