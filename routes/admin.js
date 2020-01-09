const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir=require('../helper');

router.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect(302, 'add-product');
});


router.get("/add-product", (req, res, next) => {

 res.sendFile(path.join(rootDir, 'sample.html'), err => {
        if (err)
            console.log('error occurred while sending html');
    });
});

module.exports = router