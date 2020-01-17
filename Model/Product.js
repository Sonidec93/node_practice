const fs = require('fs');
const path = require('path');
const helper = require('../helper');
const pathToProduct = path.join(helper.rootDir, 'data', 'products.json');

module.exports = class Product {

    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id ? id : Math.random().toString();

    }

    saveProduct(id) {
        helper.fetchProducts(pathToProduct, (products) => {
            if (id) {
                let productToBeEdited = products.findIndex(x => x.id == id);
                productToBeEdited = { ...this };
            } else {
                products.push(this);
            }

            fs.writeFile(pathToProduct, JSON.stringify(products), err => {
                console.log(err);
            });
        })

    }

    static fetchAll(cb) {
        helper.fetchProducts(pathToProduct, products => {
            cb(products);
        })
    }
    static findProductById(id, cb) {
        helper.fetchProducts(pathToProduct, products => {
            let product = products.find(p => p.id === id);
            product ? cb(product) : cb(null);

        })
    }
    static deleteProduct(productId, cb) {
        this.fetchAll((products) => {
            let prodIndex = products.findIndex(x => x.id == productId);
            products.splice(prodIndex, 1);
            fs.writeFile(pathToProduct, products, err => {
                if (err)
                    console.log(err);
                cb();
            })

        })
    }

}