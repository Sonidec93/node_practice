const fs = require('fs');
const path = require('path');
const helper = require('../helper');
const pathToProduct = path.join(helper.rootDir, 'data', 'products.json');

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = null;

    }

    saveProduct() {
        helper.fetchProducts(pathToProduct, (products) => {
            this.id = Math.random().toString()
            products.push(this);
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

}