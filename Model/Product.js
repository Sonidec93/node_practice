const fs = require('fs');
const path = require('path');
const rootDir = require('../helper');
const pathToProduct = path.join(rootDir, 'data', 'products.json');

function fetchProducts(cb) {
    fs.readFile(pathToProduct, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}


module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = null;

    }

    saveProduct() {
        fetchProducts((products) => {
            this.id = Math.random().toString()
            products.push(this);
            fs.writeFile(pathToProduct, JSON.stringify(products), err => {
                console.log(err);
            });
        })

    }

    static fetchAll(cb) {
        fetchProducts(products => {
            cb(products);
        })
    }
    static findProductById(id, cb) {
        fetchProducts(products => {
            let product = products.find(p => p.id === +id);
            product ? cb(product) : cb(null);

        })
    }

}