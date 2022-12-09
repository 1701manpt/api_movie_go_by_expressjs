const crypto = require('crypto-js')

const encrypt = (text) => {
    // Mã hóa
    var message = crypto.AES.encrypt(text, '2155128662001N@m').toString();

    return message
}

const decrypt = (text) => {
    // Lấy danh sách byte đã mã hóa
    var bytes = crypto.AES.decrypt(text, '2155128662001N@m');

    // Chuyển sang chuỗi gốc
    var message = bytes.toString(crypto.enc.Utf8);

    return message
}

module.exports = {
    encrypt,
    decrypt
}