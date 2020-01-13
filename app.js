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


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
// app.engine("hbs", expressHbs({ layoutsDir: 'hbs/layouts', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set("view engine", "ejs"); //it tells the express engine to use the specified engine for templating
app.set("views", "ejs"); //specifies where are the templates present by default these are stored in 'views' folders
app.use(express.static(path.join(__dirname, "static")));
app.use("/admin", adminRoutes.router);
app.use("/shop", shopRoutes);

app.use("*", (req, res, next) => {
    res.status(404).render("404", {
        docTitle: "Page Not Found!"
    });
});
app.listen(9000).on("listening", () => {
    console.log("listening on port 9000");
}); 
