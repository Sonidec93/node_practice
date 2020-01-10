const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');
const admin = require('./admin');


router.get("/", (req, res, next) => {
    res.render('shop', { products: admin.products, docTitle: 'Shop' })
    // res.status(200).sendFile(path.join(rootDir, 'views', "shop.html"));
})


module.exports = router;