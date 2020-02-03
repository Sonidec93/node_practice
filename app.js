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
//Sequelize configuration and model
// const product = require('./Model/Product');
// const user = require('./Model/User');
// const sequelize = require('./database');
// const cart = require('./Model/Cart');
// const cartItem = require('./Model/Cart-Item');
// const order = require('./Model/Order');
// const orderItem = require('./Model/Order-Item');
//--sequelize end

//Mongo config
const MongoConfig = require('./mongo-database').mongoConnect;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
// app.engine("hbs", expressHbs({ layoutsDir: 'hbs/layouts', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set("view engine", "ejs"); //it tells the express engine to use the specified engine for templating
app.set("views", "ejs"); //specifies where are the templates present by default these are stored in 'views' folders
app.use(express.static(path.resolve(__dirname, "static")));

// app.use((req, res, next) => {
//     user.findByPk(1).then(User => {
//         req.user = User;
//         next();
//     }).catch(err => {
//         console.log('error occured while fetching the user', err);
//     })
// })
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use("*", handle404.get404);

// product.belongsTo(user, { constraints: true, onDelete: 'CASCADE' })
// user.hasMany(product);//here user is in respect to the user who adds product
// user.hasOne(cart);
// cart.belongsTo(user);
// cart.belongsToMany(product, { through: cartItem });
// product.belongsToMany(cart, { through: cartItem });
// user.hasMany(order);
// order.belongsTo(user);
// order.belongsToMany(product, { through: orderItem });



// sequelize.sync({ force: true }).then(result => { //we can use {force:true} as an option in development mode as we want to get that reflected in after making changes

//     user.findByPk(1).then(User => {
//         if (!User) {
//             return user.create({ name: 'mukul', email: 'mukul.kumra@gmail.com' });
//         }
//         return User;
//     }).then(user => {
//         return user.createCart();

//     }).then(result => {
//         app.listen(9000).on("listening", () => {
//             shopRoutes
//             console.log("listening on port 9000");
//         });
//     })


// }).catch(err => {
//     console.log(err);
// })

MongoConfig(client => {
    console.log(client);
    app.listen(9000).on('listening', () => {
        console.log('listening at port 9000');
    })

})
