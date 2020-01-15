const Product = require('../Model/Product');

function fetchAll(req, res, next) {
    Product.fetchAll((products) => {
        res.render('shop', {
            hasProducts: products.length > 0,
            products: products,
            docTitle: 'Shop',
            productCss: true,
            activeShop: true
        })
    })

}


module.exports = {
    fetchAll
}