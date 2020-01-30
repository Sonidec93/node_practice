const sequelize = require('../database');
const Sequelize = require('sequelize');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem