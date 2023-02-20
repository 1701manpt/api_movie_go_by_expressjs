require('dotenv').config()

const config = {
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   dialect: 'mssql',
   port: 54817,
   dialectOptions: {
      instanceName: process.env.SERVER,
      useUTC: false, // for reading from database
   },
   timezone: '+07:00',
}

module.exports = config
