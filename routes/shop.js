const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');
const admin = require('./admin');


router.get("/", (req, res, next) => {
    res.render('shop', {
            hasProducts:admin.products.length>0,
            products: admin.products,
            docTitle: 'Shop',
            productCss:true,
            activeShop:true
        })
        // res.status(200).sendFile(path.join(rootDir, 'views', "shop.html"));
})


module.exports = router; 