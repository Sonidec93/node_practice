const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');
const products = [];
router.post("/product", (req, res, next) => {

    products.push(req.body);
    res.redirect(302, 'add-product');
});


router.get("/add-product", (req, res, next) => {
    console.log(products);
    res.render('add-product', {docTitle: 'Add Product',formCss:true,
    activeProduct:true,productCss:true});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'), err => {
    //     if (err)
    //         console.log('error occurred while sending html');
    // });
});

module.exports = {
    router: router,
    products: products
}