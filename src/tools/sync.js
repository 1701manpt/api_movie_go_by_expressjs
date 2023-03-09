const sequelize = require('~/connection')
const insertMovie = require('~/tools/insert-movies')

const delDataAndSyncModel = async () => {
    // Đồng bộ hóa database với Sequelize
    await sequelize.sync({ force: true })

    insertMovie()
}

module.exports = delDataAndSyncModel
