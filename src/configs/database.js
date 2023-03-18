require('dotenv').config()
const defineTable = require('~/configs/tables')

const config = {
    // database: process.env.DB_NAME,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // dialect: 'mssql',
    // port: 54817,
    // dialectOptions: {
    //     instanceName: process.env.SERVER,
    //     useUTC: false, // for reading from database
    //     options: {
    //         encrypt: true,
    //     },
    // },
    // timezone: '+07:00',
    // // logging: false,
    // // database options...
    // define: defineTable,

    host: process.env.HOST_1,
    username: process.env.DB_USERNAME_1,
    password: process.env.DB_PASSWORD_1,
    database: process.env.DB_NAME_1,
    dialect: 'postgres',
    port: 5432,
    protocol: 'postgres',
    dialectOptions: {
        useUTC: false,
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    timezone: '+07:00',
    define: defineTable,
}

module.exports = config
