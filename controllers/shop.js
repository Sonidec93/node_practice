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


  ////sequelize
  // Product.findAll().then(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   })
  // })
  ////end

  ////mongo
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  ////end
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
  ////sequelize
  // Product.findAll().then(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   })
  // })

  ////end

  ////mongo
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  ////end
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
////sequelize
  // req.user.getCart().then(cart => {
  //   cart.getProducts().then(products => {
  //     console.log(products);
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: products,
  //       totalPrice: products.reduce((sum, product) => sum + product.price * product.CartItem.quantity, 0)
  //     });
  //   })
  // });
  ////end

  ////mongo
  req.user.getCart().then(products=>{
    res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            totalPrice: products.reduce((sum, product) => sum + product.price * product.quantity, 0)
          });
  })
  ////end

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
  ////sequelize
  // req.user.getCart().then(cart => {
  //   cart.getProducts({ where: { id: +req.body.productId } }).then(products => {
  //     cart.removeProduct(products[0]);
  //     res.redirect('/cart')
  //   })
  // });
  ////end
////mongo

////end

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
  ////sequelize
  // req.user.getCart().then(cart => {
  //   cart.getProducts({ where: { id: +req.body.productId } }).then(products => {

  //     if (products.length > 0) {
  //       var product = products[0];
  //     }
  //     if (product) {
  //       //changing the quantity
  //       var new_quantity = ++(product.CartItem.quantity);
  //       return cart.addProduct(product, { through: { quantity: new_quantity } });
  //     }
  //     else {
  //       return Product.findByPk(+req.body.productId).then(product => {
  //         return cart.addProduct(product, { through: { quantity: 1 } });
  //       })
  //     }

  //   }).then(() => {
  //     res.status(302).redirect('/cart');
  //   })
  // })
  ////end

  ////Mongo
  Product.findById(req.body.productId).then(product => {
    req.user.addToCart(product).then(result => {
      res.status(302).redirect('/');
    });
  })
  ////end

}

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

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
exports.createOrder = async (req, res, next) => {
  // let fetchedCart;
  let fetchedCart = await req.user.getCart();
  let products = await fetchedCart.getProducts();
  let order = await req.user.createOrder();
  await order.addProducts(products.map(product => {
    product.OrderItem = { quantity: product.CartItem.quantity }
    return product;
  }));
  await fetchedCart.setProducts(null);
  res.redirect('/cart');
}
exports.getOrders = async (req, res, next) => {

  let orders = await req.user.getOrders({ include: ['products'] });
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders',
    orders: orders
  });
}

