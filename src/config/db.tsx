const mysql = require('mysql2/promise')

export const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    namedPlaceholders: true,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on traffic
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});