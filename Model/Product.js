// const Sequelize = require('sequelize');
// const sequelize = require('../database');
const mongo_db = require('../mongo-database').getDB;
const mongoDB = require('mongodb');
const MongoDb = require('mongodb');
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

    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        let db = mongo_db();
        if (this._id) {
            return db.collection('product').updateOne({ _id: new MongoDb.ObjectId(this._id) }, { $set: {title:this.title,price:this.price,description:this.description,imageUrl:this.imageUrl} });
        }
        return db.collection('product').insertOne(this);

    }

    static fetchAll() {
        return mongo_db().collection('product').find().toArray();
    }

    static findById(id) {
        // return mongo_db().collection('product').find({ _id: new mongoDB.ObjectId(id) }).toArray();
        return mongo_db().collection('product').find({ _id: new mongoDB.ObjectId(id) }).next();
    }
    static deleteProduct(id) {
        return mongo_db().collection('product').deleteOne({ _id: new MongoDb.ObjectId(id) })
    }
}

module.exports = Product