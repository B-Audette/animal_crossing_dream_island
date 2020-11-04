// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================


var db = require("../models");
var passport = require("../config/passport");
const { villagers } = require("animal-crossing")

// Routes
// =============================================================
module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // GET route for getting all of the villagers
  app.get("/api/villagers", function (req, res) {
    db.Villager.findAll()
      .then(function (dbVillager) {
        res.json(dbVillager);
      });
  });

  app.post("/api/villagers", function (req, res) {
    db.Villager.create(req.body)
      .then(function (data) {
        req.body.id=(data.dataValues.id)
        res.json(req.body)
        
        res.status(200).end();
      });
  });

 // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      islandName: req.body.islandName,
      dodo: req.body.dodo
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });



    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          islandName: req.user.islandName,
          id: req.user.id
        });
      }
    });

  app.get("/api/all_villagers", function (req, res) {

    res.json(villagers);

  });

  app.get("/api/oneVillager/:villagerName", function (req, res) {

    function findVillagerByName(name) {
      for (let i = 0; i < villagers.length; i++) {
        if (villagers[i].name === name) {
          return villagers[i];
        }
      }
    }
    let currentVillager = findVillagerByName(req.params.villagerName)
    console.log(req.params.villagerName);
    console.log(currentVillager);
    // console.log("Current villager is: " + currentVillager);
    res.json(currentVillager);

  })

   // DELETE route for deleting posts
   app.delete("/api/villagers/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbVillager) {
        res.json(dbVillager);
      });
  });
};