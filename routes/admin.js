const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');
const productController=require('../controller/product');

router.post("/product", productController.saveProduct);


router.get("/add-product", productController.addProduct);

module.exports = router