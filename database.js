// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'NodeApp',
//     password: 'dunston@123'
// });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('NodeApp', 'root', 'dunston@123', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;