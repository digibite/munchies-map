var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  
  app.get("/", function(req, res) {
    res.redirect("/index.html");
  });

  app.get("/login", function(req, res) {
    res.redirect("/login.html");
  });

  app.get("/signup", function(req, res) {
    res.redirect("/signup.html");
  });

  app.get("/profile", function(req, res) {
    res.redirect("/profile.html");
  });

  app.get("/contact", function(req, res) {
    res.redirect("/contact2.html");
  });

  app.get("/*", function(req, res) {
    res.redirect("/error.html");
  });
};

