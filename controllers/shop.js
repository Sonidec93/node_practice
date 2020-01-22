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
  cart.getCart((cart) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cart.products,
      totalPrice: cart.totalPrice
    });
  })

};

exports.removeFromCart = (req, res, next) => {
  Product.findProductById(req.body.productId, (product) => {
    cart.removeFromCart(product, (cart) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cart.products,
        totalPrice: cart.totalPrice
      });
    })
  })
}
exports.addToCart = (req, res, next) => {
  Product.findProductById(req.body.productId, product => {
    cart.save(product, (cartData) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartData.products,
        totalPrice: cartData.totalPrice
      });
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

