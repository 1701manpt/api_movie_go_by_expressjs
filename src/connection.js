const { Sequelize } = require('sequelize')

// configs
const config = require('./configs/connectDb')

const sequelize = new Sequelize(config)

sequelize
   .authenticate()
   .then(response => {
      console.log('Connection has been established successfully.')
   })
   .catch(error => {
      console.error('Unable to connect to the database:', error)
   })
   .finally(err => {})

module.exports = sequelize
