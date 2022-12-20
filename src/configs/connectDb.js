require('dotenv').config()

const config = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": process.env.SERVER
    }
}

module.exports = config