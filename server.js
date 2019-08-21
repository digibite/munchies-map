// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(session({
    secret: "munchies", 
    resave: false,
    saveUninitialized: true,
    cookie: {secure: "auto"}
}));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/login-routes.js")(app);



// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});