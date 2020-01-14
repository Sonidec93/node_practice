const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');
const admin = require('./admin');
const shopController = require('../controller/shop');

router.get("/", shopController.fetchAll)


module.exports = router; 