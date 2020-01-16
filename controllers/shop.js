const Product = require('../Model/Product');
const cart = require('../Model/Cart')
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.addToCart = (req, res, next) => {
  Product.findProductById(req.body.productId, product => {
    cart.Cart.save(product, () => {
      console.log('succeeded');
    })
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.getProduct = (req, res, next) => {
  Product.findProductById(req.params.productId, product => {
    res.status(200).render('shop/product-detail', { product: product, path: '/products', pageTitle: 'Product Detail' });
  })
}

