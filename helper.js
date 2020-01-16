const path = require('path');
const fs = require('fs');


exports.rootDir = path.dirname(process.mainModule.filename);

exports.fetchProducts = (path, cb) => {
    fs.readFile(path, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}
