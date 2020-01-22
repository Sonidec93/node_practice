const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);


router.get('/products/:productId', shopController.getProduct)


router.get('/cart', shopController.getCart);

router.post('/cart',shopController.addToCart)
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);
router.post('/remove-from-cart',shopController.removeFromCart)

module.exports = router;
