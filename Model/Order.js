const sequelize = require('../database');
const Sequelize = require('sequelize');

const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Order