var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// GET route for getting all of the posts
app.get("/api/vendors/", function(req, res) {

  db.Vendor.findAll({
    where: { 
      status: true
  },
    include: [{model: db.Location}, {model: db.Item}],
    order: [[db.Location, "id", "DESC"]]
  })
    .then(function(data) {
      res.json(data);
    });
});

app.get("/api/vendors/:search", function(req, res) {

  db.Vendor.findAll({
    where: { 
      status: true
  },  
    include: [{model: db.Location}, {model: db.Item, where: {name: {$like: "%" + req.params.search + "%"}}}]
  })
    .then(function(data) {
      res.json(data);
    });
});

app.get("/api/menu/:id", function(req, res) {
 
     db.Item.findAll({
        WHERE:{VendorId: req.params.id}
     })
      .then(function(data) {
        res.json(data);
      });
  });
  
  app.post("/api/vendors", function(req, res) {
    console.log(req.body);
    db.Vendor.create({
      owner_name: req.body.owner_name,
      business_name: req.body.business_name,
      logo: req.body.logo,
      email: req.body.email,
      password: req.body.password
    })
      .then(function(data) {
        res.json(data);
      });
  });

  app.post("/api/menu", function(req, res) {
    console.log(req.body);
    db.Item.create({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        VendorId: req.body.VendorId
    })
      .then(function(data) {
        res.json(data);
      });
  });

  app.put("/api/vendors", function(req, res) {
    db.Vendor.update({
      status: req.body.status
    }, {
        where: {
          id: req.body.id
        }
      })
      .then(function(data) {
        res.json(data);
      });
  });
  app.put("/api/menu", function(req, res) {
    db.Item.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(data) {
        res.json(data);
      });
  });
  app.delete("/api/vendors/:id", function(req, res) {
    db.Vendor.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      });
  });
  app.delete("/api/menu/:id", function(req, res) {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      });
  });

  app.post("/api/location", function(req, res) {
    console.log(req.body);
    db.Location.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      VendorId: req.body.VendorId
    })
      .then(function(data) {
        res.json(data);
      });
  });
}

