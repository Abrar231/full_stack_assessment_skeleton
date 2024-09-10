require('dotenv').config();

module.exports = {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    allowedOrigin: process.env.ALLOWED_ORIGIN
}