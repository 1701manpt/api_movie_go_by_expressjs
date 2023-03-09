require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({
            status: 401,
            message: 'Authentication token required',
        })
    } // Nếu không có token thì trả về lỗi 401 Unauthorized

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        // Xác thực token bằng jwt.verify
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Invalid or expired token',
            })
        } // Nếu xác thực không thành công thì trả về lỗi 403 Forbidden
        req.user = user // Lưu thông tin người dùng vào đối tượng yêu cầu
        next() // Cho phép tiếp tục xử lý các middleware khác hoặc xử lý yêu cầu
    })
}

// Middleware authorize token để kiểm tra quyền truy cập của người dùng
const authorizeToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (![1].includes(req.user.role_id)) {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            })
        }
        next()
    })
}

module.exports = { authenticateToken, authorizeToken }
