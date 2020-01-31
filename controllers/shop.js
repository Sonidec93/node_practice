const Product = require('../Model/Product');
const cart = require('../Model/Cart');


exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   })
  // })
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
};

exports.getIndex = (req, res, next) => {

  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   })
  // });
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
};

exports.getCart = (req, res, next) => {
  // cart.getCart((cart) => {
  //   res.render('shop/cart', {
  //     path: '/cart',
  //     pageTitle: 'Your Cart',
  //     products: cart.products,
  //     totalPrice: cart.totalPrice
  //   });
  // })

  req.user.getCart().then(cart => {
    cart.getProducts().then(products => {
      console.log(products);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        totalPrice: products.reduce((sum, product) => sum + product.price, 0)
      });
    })
  });

};

exports.removeFromCart = (req, res, next) => {
  // Product.findProductById(req.body.productId, (product) => {
  //   cart.removeFromCart(product, (cart) => {
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cart.products,
  //       totalPrice: cart.totalPrice
  //     });
  //   })
  // })
  
  req.user.getCart().then(cart=>{
    cart.getProducts({ where: { id: +req.body.productId } }).then(products => {
    cart.removeProduct(products[0]);
    res.redirect('/cart')
  })
});
}
exports.addToCart = (req, res, next) => {
  // Product.findProductById(req.body.productId, product => {
  //   cart.save(product, (cartData) => {
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartData.products,
  //       totalPrice: cartData.totalPrice
  //     });
  //   })
  // })

  req.user.getCart().then(cart => {
    cart.getProducts({ where: { id: +req.body.productId } }).then(products => {

      if (products.length > 0) {
        var product = products[0];
      }
      if (product) {
        //
      }
      else {
        return Product.findByPk(+req.body.productId).then(product => {
          return cart.addProduct(product, { through: { quantity: 1 } });
        })
      }

    }).then(() => {
      res.status(302).redirect('/cart');
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
  // Product.findProductById(req.params.productId, product => {
  //   res.status(200).render('shop/product-detail', { product: product, path: '/products', pageTitle: 'Product Detail' });
  // })
  Product.findByPk(req.params.productId).then(product => {
    res.status(200).render('shop/product-detail', { product: product, path: '/products', pageTitle: 'Product Detail' });

  })
}

