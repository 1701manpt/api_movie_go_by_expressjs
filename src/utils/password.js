const bcrypt = require('bcrypt')

// Hàm để hash mật khẩu
async function hashPassword(password) {
    const saltRounds = 10 // Số vòng lặp được sử dụng để tạo salt
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

// Hàm để so sánh mật khẩu đã được hash và mật khẩu ban đầu
async function comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
}

module.exports = { hashPassword, comparePassword }
