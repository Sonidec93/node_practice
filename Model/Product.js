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
    constructor(title) {
        this.title = title;
    }

    saveProduct() {
        fetchProducts((products) => {
            products.push(this);
            fs.writeFile(pathToProduct, JSON.stringify(products), err => {
                console.log(err);
            });
        })

    }

    static fetchAll(cb) {
        fetchProducts(products=>{
            cb(products);
        })
    }

}