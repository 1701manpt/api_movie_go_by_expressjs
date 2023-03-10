require('dotenv').config()
const defineTable = require('~/configs/tables')

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'mssql',
    port: 54817,
    dialectOptions: {
        instanceName: process.env.SERVER,
        useUTC: false, // for reading from database
        options: {
            encrypt: true,
        },
    },
    timezone: '+07:00',
    // logging: false,
    // database options...
    define: defineTable,
}

module.exports = config
