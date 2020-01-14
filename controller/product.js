const Product = require('../Model/Product');


function addProduct(req, res, next) {
    res.render('add-product', {
        docTitle: 'Add Product', formCss: true,
        activeProduct: true, productCss: true
    });
}

function saveProduct(req, res, next) {
    let prod = new Product(req.body.title)
    prod.saveProduct();
    // products.push(req.body);
    res.render('add-product', {
        docTitle: 'Add Product', formCss: true,
        activeProduct: true, productCss: true
    });
}

module.exports = {
    addProduct: addProduct,
    saveProduct: saveProduct
}