const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

let _db;
console.log('in mongo db');
const mongoConnect = cb => {
    mongoClient.connect('mongodb+srv://mukulkumra:dunston@123@cluster0-hln0c.mongodb.net/test?retryWrites=true&w=majority').then(client => {
        _db = client.db();
        cb();
    }).catch(err => {
        console.log('error occured while connecting mongo db\n', err);
    })


}

const getDB = () => {
    if (_db) {
        return _db
    }
    else {
        throw new Error('No Database connected');
    }
}

module.exports = {
    mongoConnect: mongoConnect,
    getDB: getDB
}
