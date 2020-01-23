const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'NodeApp',
    password: 'dunston@123'
});

module.exports = pool.promise();