// const sequelize = require('../database');
// const Sequelize = require('sequelize');

// const User = sequelize.define('User', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement:true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

//end
//Mongo
const MongoDB = require('mongodb');
const db = require('../mongo-database').getDB;

class User {
    constructor({ name, email, cart, _id }) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = _id;
    }

    addToCart(product) {
        let updatedCart;
        if (this.cart) {
            let itemIndex = this.cart.items.findIndex(x => x.productId.toString() === product._id.toString());
            this.cart.items[itemIndex].quantity += 1;
            updatedCart = { ...this.cart };
        }
        else {
            updatedCart = { items: [{ productId: new MongoDB.ObjectId(product._id), quantity: 1 }] };
        }


        return db().collection('user').updateOne({ _id: new MongoDB.ObjectId(this._id) }, { $set: { cart: updatedCart } })
    }
    save() {
        if (!this._id) {
            return db.collection('user').insertOne(this);
        }
        else {
            return db.collection('user').updateOne({ _id: new MongoDB.ObjectId(this._id) }, { $set: { name: this.name, email: this.email } });
        }
    }

    static findById(id) {
        return db().collection('user').findOne({ _id: new MongoDB.ObjectId(id) })
    }

    removeFromCart(product) {
        let itemIndex = this.cart.items.findIndex(x => x.productId === product._id);
        let updatedCart = { ...this.cart };
        updatedCart.items.splice(itemIndex, 1);

        return db().collection('user').updateOne({ _id: this._id }, { $set: { cart: updatedCart } })


    }
    getCart() {
        if (this.cart) {
            let prodId_array = this.cart.items.map(x => x.productId);
            return db().collection('product').find({ _id: { $in: prodId_array } }).then(products => {
                return products.map(prod => {
                    prod.quantity = this.cart.items.find(x => x.productId.toString() === prod._id.toString()).quantity;
                    return prod;
                })
            });
        }
        else {
            return Promise.resolve([]);
        }
    }
}
//end
module.exports = User