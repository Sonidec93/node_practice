const sequelize = require('../database');
const Sequelize = require('sequelize');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity:Sequelize.INTEGER
});

module.exports = OrderItem;