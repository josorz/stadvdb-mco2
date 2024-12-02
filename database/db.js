const mysql = require('mysql2/promise')
const dotenv = require(`dotenv`).config();

exports.pool = mysql.createPool({
    host: 'localhost', // Replace with
    user: 'root', //
    password: 'password', //
    port: 3306,
    database: 'steamgames',
    namedPlaceholders: true,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on traffic
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});