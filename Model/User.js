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
        if (this.cart && this.cart.items.length > 0) {


            let itemIndex = this.cart.items.findIndex(x => x.productId.toString() === product._id.toString());
            updatedCart = { ...this.cart };
            if (itemIndex>=0) {
            updatedCart.items[itemIndex].quantity += 1;

            }
            else {
                updatedCart.items.push({ productId: new MongoDB.ObjectId(product._id), quantity: 1 });
            }

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
    createOrder() {
        return db().collection('order').insertOne({ items: this.cart.items, userId: new MongoDB.ObjectID(this._id) }).then(result => {
            this.cart = null;
            return db().collection('user').updateOne({ _id: new MongoDB.ObjectId(this._id) }, { $set: { cart: this.cart } });
        })

    }

    getOrders() {
        let ordersArray = [];
        let prodIdArray = new Set();
        let prodArray = []
        return db().collection('order').find({ userId: new MongoDB.ObjectId(this._id) }).toArray().then(orders => {
            ordersArray = [...orders];
            orders.forEach(order => {
                order.items.forEach(item => {
                    prodIdArray.add(item.productId);
                });
            })

            return db().collection('product').find({ _id: { $in: [...prodIdArray] } }).toArray().then(products => {
                prodArray = [...products];
                ordersArray = ordersArray.map(order => {
                    order.products = order.items.map(item => {
                        let prod = prodArray.find(x => x._id.toString() === item.productId.toString());
                        prod.quantity = item.quantity;
                        return prod;
                    })
                    return order;
                })
                return ordersArray
            });


        });
    }
    getCart() {
        if (this.cart) {
            let prodId_array = this.cart.items.map(x => x.productId);
            return db().collection('product').find({ _id: { $in: [...prodId_array] } }).toArray().then(products => {
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