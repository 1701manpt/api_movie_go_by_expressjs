const crypto = require('crypto')

const random = () => {
    const buf = crypto.randomBytes(64, (err, buf) => {
        if (err) throw err
        console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`)
    })
}

module.exports = random
