var http = require('http');
// var fs = require('fs');
// var reqHandler = require('./request_handler');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var adminRoutes=require('./routes/admin');
var shopRoutes=require('./routes/shop');
var app = express();//middleware

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'static')))
app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);

app.use("*",(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'404.html'))
});
app.listen(8000).on('listening', () => {
    console.log('listening on port 8000');
});