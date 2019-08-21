var db = require("../models");

module.exports = function (app) {

app.get("/login", function(req, res) {
    // check session first
    if (req.session.user) {
      res.redirect("/profile");
    }
    // then check cookie
    else if (req.headers.cookie.indexOf("token=") !== -1) {
      // use regex to grab cookie from headers string
      var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
      // compare cookie against db records
      db.Vendor.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      }).then(function(user) {
        if(user.token === cookie) {
          req.session.user = user;

          res.redirect("/profile");
        }
      });
  
      // no match, so clear cookie
      res.clearCookie("token");
      res.redirect("/login");
    }
    // if no session or cookie, send initial login form
    else {
      res.redirect("/login");
        
    }
  });
  
  app.get("/profile", function(req, res) {
    // only users with set session can see this route
    if (req.session.user) {
      console.log(req.session.user);

    }
    else {
      res.redirect("/");
    }
  });
  
  app.get("/logout", function(req, res) {
    // clear cookie and session
    res.clearCookie("token");
    req.session.destroy();
  
    res.redirect("/");
  });
  
    app.post("/login", function(req, res) {
    
        // look for user that matches the posted username and password
        db.Vendor.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            include: [db.Item]
        }).then(function(user) {
            if(user) {
                console.log(req.body);
                var token = "t" + Math.random();
                user.token = token;

                res.cookie("token", token, {expires: new Date(Date.now() + 999999999)});
                req.session.user = user;
                let {id, owner_name, business_name, status } = req.session.user;
                let copy = {id, owner_name, business_name, status };
                
                res.json(copy);
            }
            else {
                res.send(null);
            }
        });
    });
}