// const Sequelize = require('sequelize');
// const sequelize = require('../database');
const mongo_db = require('../mongo-database').getDB;

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });


class Product {

    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        let db = mongo_db();
        return db.collection('product').insertOne(this);

    }
}

module.exports = Product