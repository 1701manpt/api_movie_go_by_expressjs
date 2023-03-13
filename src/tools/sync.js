const sequelize = require('~/connection')
const insertMovies = require('~/tools/insert-movies')
const {
    insertAccounts,
    insertThreatersAndSeats,
    insertAccountStatuses,
    insertRoles,
    insertOrderStatuses,
    insertCategoriesAndProducts,
} = require('~/tools/insert-data-default')

const delDataAndSyncModel = async () => {
    // Đồng bộ hóa database với Sequelize
    await sequelize.sync({ force: true })
    await insertAccountStatuses()
    await insertOrderStatuses()
    await insertRoles()
    await insertAccounts()
    await insertThreatersAndSeats()
    await insertCategoriesAndProducts()
    await insertMovies()
}

module.exports = delDataAndSyncModel
