const Product = require('../Model/Product');
const Cart = require('../Model/Cart');


exports.getAddProduct = (req, res, next) => {
  console.log('in admin with user logged in', req.user);

  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const userId = req.user.id;
  // const id = +req.body.productId;

  new Product(title, price, description, imageUrl).save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err);
  })
  // new Product(title, imageUrl, description, price, id).saveProduct(id,()=>{
  //   res.status(302).redirect('/admin/products');

  // });
  // new Product(title, imageUrl, description, price, id).saveProduct(id).then((result) => {
  //   res.status(302).redirect('/products');
  // })
  // if (id) {
  // Product.findOne({ where: { id: id } }).then(product => {
  //   product.update({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description,
  //   }).then(result => {
  //     console.log('update succeeded');
  //   })
  // }).catch(err => {
  //   console.log(err);
  // })
  //above approach also works
  //   await Product.update({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description,
  //     UserId: userId
  //   }, {
  //     where: { id: id }
  //   }).then(result => {
  //     console.log('update succeeded');
  //   })
  // }
  // else {
  //   await Product.create({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description,
  //     UserId: userId
  //   }).then(result => {
  //     console.log(result);

  //   }).catch(err => {
  //     console.log(err);

  //   })
  // }
  // res.status(302).redirect('/admin/products');

};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
  //used with using mysql2 package
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render('admin/products', {
  //     prods: rows,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   })
  // });
  console.log(req.user);
  Product.findAll({ where: { UserId: req.user.id } }).then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })

};
exports.removeProduct = (req, res, next) => {
  Product.findOne({ where: { id: +req.body.prodId } }).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('product deleted');
    res.status(302).redirect('/admin/products');
  });
  // Product.findProductById(req.body.prodId, (product) => {
  //   Cart.removeFromCart(product, () => {
  //     Product.deleteProduct(req.body.prodId, () => {
  //       return res.redirect('/');
  //     });
  //   })
  // })
}
exports.editProduct = (req, res, next) => {
  // Product.findProductById(req.params.productId, (product) => {
  //   res.render('admin/edit-product', { product: product, pageTitle: 'Edit Product', path: '/admin/products' })
  // })
  Product.findByPk(+req.params.productId).then(product => {
    res.render('admin/edit-product', { product: product, pageTitle: 'Edit Product', path: '/admin/products' })
  })
  // Product.findProductById(req.params.productId).then(([rows, fieldData]) => {
  //   res.render('admin/edit-product', { product: rows[0], pageTitle: 'Edit Product', path: '/admin/products' });
  // })
} 