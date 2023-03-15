require('dotenv').config()
const defineTable = require('~/configs/tables')

const config = {
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
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

    "username": "moviego",
    "password": "A6XpVGrfFD4WUzoXpfU5puM77zIy94F0",
    "host": "dpg-cg84bendvk4ljrg7dcig-a.singapore-postgres.render.com",
    "database": "moviego",
    "dialect": "postgres",
    "port": 5432,
    "protocol": "postgres",
    "dialectOptions": {
        "useUTC": false,
        "ssl": {
            "require": true,
            "rejectUnauthorized": false
        }
    },
    "timezone": "+07:00",
}

module.exports = config
