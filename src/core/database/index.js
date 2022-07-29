require('dotenv').config();

module.exports = {
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    define: {
        timestamps: false
    }
}
