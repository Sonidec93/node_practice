const path = require('path');
const fs = require('fs');


exports.rootDir = path.dirname(process.mainModule.filename);

exports.fetchProducts = (path, cb, type = 'product') => {
    fs.readFile(path, (err, fileContent) => {
        if (err) {
            if (type == 'product')
                return cb([]);
            else
                return cb({ products: [], totalPrice: 0 });
        }
        return cb(JSON.parse(fileContent));
    });
}
