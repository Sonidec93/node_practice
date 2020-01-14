const Product = require('../Model/Product');

function fetchAll(req, res, next) {
    var prods = Product.fetchAll()
    res.render('shop', {
        hasProducts: prods.length > 0,
        products: prods,
        docTitle: 'Shop',
        productCss: true,
        activeShop: true
    })
}


module.exports = {
    fetchAll    
}