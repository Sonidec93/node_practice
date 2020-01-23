const fs = require('fs');
const path = require('path');
const helper = require('../helper');
const pathToProduct = path.join(helper.rootDir, 'data', 'products.json');
const db = require('../database');

module.exports = class Product {

    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id ? id : Math.random();

    }

    async saveProduct(id, cb) {
        // helper.fetchProducts(pathToProduct, (products) => {
        //     if (id) {
        //         let productToBeEdited = products.find(x => +x.id == +id);
        //         let prodIndex = products.findIndex(x => +x.id == +id);
        //         productToBeEdited = { ...this };
        //         products.splice(prodIndex, 1, productToBeEdited)

        //     } else {
        //         products.push(this);
        //     }

        //     fs.writeFile(pathToProduct, JSON.stringify(products), err => {
        //         if (err)
        //             console.log(err);
        //         cb();

        //     });
        // })
        if (id) {
            return db.execute('update product set title=?,description=?,imageUrl=?,price=? where id=?', [this.title, this.description, this.imageUrl, this.price, +id]);
        }
        return db.execute('insert into product (title,description,imageUrl,price) va    lues(?,?,?,?)', [this.title, this.description, this.imageUrl, this.price])

    }

    static async fetchAll(cb) {
        // helper.fetchProducts(pathToProduct, products => {
        //     cb(products);
        // })
        return await db.execute('select * from product');
    }
    static async findProductById(id, cb) {
        // helper.fetchProducts(pathToProduct, products => {
        //     let product = products.find(p => +p.id === +id);
        //     product ? cb(product) : cb(null);

        // })

        return db.execute('select * from product where id=?', [+id]);
    }
    static deleteProduct(productId, cb) {
        this.fetchAll((products) => {
            let prodIndex = products.findIndex(x => +x.id == +productId);
            products.splice(prodIndex, 1);
            fs.writeFile(pathToProduct, products, err => {
                if (err)
                    console.log(err);
                cb();
            })

        })
    }

}