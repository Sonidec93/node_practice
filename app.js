var http = require('http');
// var fs = require('fs');
// var reqHandler = require('./request_handler');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var adminRoutes = require('./routes/admin');
var shopRoutes = require('./routes/shop');
var app = express();//middleware

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');//it tells the express engine to use the specified engine for templating
app.set('views', 'pug');//species where are the templates present by default these are stored in 'views' folders
app.use(express.static(path.join(__dirname, 'static')))
app.use('/admin', adminRoutes.router);
app.use('/shop', shopRoutes);

app.use("*", (req, res, next) => {
    res.status(404).render('404', { docTitle: 'Page Not Found!' });
});
app.listen(8000).on('listening', () => {
    console.log('listening on port 8000');
});