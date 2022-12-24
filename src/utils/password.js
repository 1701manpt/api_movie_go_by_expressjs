require('dotenv').config()
var bcrypt = require('bcryptjs')

const toHash = (passwordClient) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(passwordClient, salt)

    return hash.toString()
}

const toCheck = (passwordClient, passwordDb) => {
    const result = bcrypt.compareSync(passwordClient, passwordDb)

    return result
}

module.exports = { toHash, toCheck }