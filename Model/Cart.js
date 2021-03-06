const sequelize = require('../database');
const Sequelize = require('sequelize');

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Cart