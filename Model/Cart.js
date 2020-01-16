const fs = require('fs');
const path = require('path');
const helper = require('../helper');
const pathToCartJson = path.join(helper.rootDir, 'data', 'cart.json');


exports.Cart = class Cart {
    static save(product, cb) {
        fs.readFile(pathToCartJson, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            let newProduct = {};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            let existingProduct = cart.products.find(prod => prod.id === product.id);
            let prodIndex = cart.products.findIndex(prod => prod.id === product.id);
            let updatedProduct = {};
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products.splice(prodIndex, 1, updatedProduct);
            }
            else {
                updatedProduct = { id: product.id, qty: 1 };
                cart.products.push(updatedProduct);
            }
            cart.totalPrice += +product.price;
            fs.writeFile(pathToCartJson, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
                cb();
            })

        })
    }
}