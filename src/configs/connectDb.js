require('dotenv').config()

// const config = {
//     "username": process.env.DB_USERNAME,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_DATABASE,
//     "host": process.env.DB_HOST,
//     "dialect": "mssql",
//     "port": 1433,
//     // "port": 1433,
//     // "dialectOptions": {
//     //     "instanceName": process.env.SERVER
//     // }
// }

const config = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "26.227.231.214",
    "dialect": "mssql",
    "port": 1433,
    // "port": 1433,
    // "dialectOptions": {
    //     "instanceName": process.env.SERVER
    // }
}

module.exports = config