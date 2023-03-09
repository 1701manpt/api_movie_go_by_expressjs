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
        options: {
            encrypt: true,
        },
    },
    timezone: '+07:00',
    // logging: false,
    // database options...
    define: {
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: false, // enable soft delete
        // other model options...
    },
}

module.exports = config
