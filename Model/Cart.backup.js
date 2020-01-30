const fs = require('fs');
const path = require('path');
const helper = require('../helper');
const pathToCartJson = path.join(helper.rootDir, 'data', 'cart.json');


function getProductIndex(products, product) {
    let existingProduct = products.find(prod => +prod.id === +product.id);
    let prodIndex = products.findIndex(prod => +prod.id === +product.id);
    return [existingProduct, prodIndex];
}

module.exports = class Cart {
    static save(product, cb) {
        helper.fetchProducts(pathToCartJson, (data) => {    
            let cart = data;
            let [existingProduct, prodIndex] = getProductIndex(cart.products, product);
            let updatedProduct = {};
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products.splice(prodIndex, 1, updatedProduct);
            }
            else {
                updatedProduct = { id: +product.id, title: product.title, qty: 1 };
                cart.products.push(updatedProduct);
            }
            cart.totalPrice += +product.price;
            fs.writeFile(pathToCartJson, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
                cb(cart);
            })

        }, 'cart')

    }
    static removeFromCart(product, cb) {
        helper.fetchProducts(pathToCartJson, (data) => {
            let cart = data;
            let [existingProduct, prodIndex] = getProductIndex(cart.products, product);
            if (existingProduct) {
                let priceTobeDeducted = +product.price * existingProduct.qty;
                cart.totalPrice = cart.totalPrice - priceTobeDeducted;
                cart.products.splice(prodIndex, 1)
                fs.writeFile(pathToCartJson, JSON.stringify(cart), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    cb(cart);
                });
            }
            else {
                cb();
            }

        }, 'cart')

    }
    static getCart(cb) {
        helper.fetchProducts(pathToCartJson, (data) => {
            cb(data);
        }, 'cart')
    }
}