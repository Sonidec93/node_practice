var http = require("http");
// var fs = require('fs');
// var reqHandler = require('./request_handler');
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var adminRoutes = require("./routes/admin");
var shopRoutes = require("./routes/shop");
var app = express(); //middleware
var expressHbs = require('express-handlebars');
var handle404 = require('./controllers/error');

const sequelize = require('./database');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
// app.engine("hbs", expressHbs({ layoutsDir: 'hbs/layouts', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set("view engine", "ejs"); //it tells the express engine to use the specified engine for templating
app.set("views", "ejs"); //specifies where are the templates present by default these are stored in 'views' folders
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use("*", handle404.get404);
sequelize.sync().then(result => {
    console.log(result);
    app.listen(9000).on("listening", () => {
        console.log("listening on port 9000");
    });
}).catch(err => {
    console.log(err);
})

