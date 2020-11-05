const db = require("../models");
const passport = require("../config/passport");
const { villagers } = require("animal-crossing")

module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("signup")
    db.User.create({
      islandName: req.body.islandName,
      dodo: req.body.dodo
    })
      .then(function () {
        res.redirect("/home");
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json(err);
      });
  });
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
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

  // GET route for getting all of the villagers in database
  app.get("/api/villagers", function (req, res) {
    db.Villager.findAll()
      .then(function (dbVillager) {
        res.json(dbVillager);
      });
  });

  // POST route to add villager to database
  app.post("/api/villagers", function (req, res) {
    db.Villager.create(req.body)
      .then(function (data) {
        req.body.id = (data.dataValues.id)
        res.json(req.body)
        res.status(200).end();
      });
  });

  // GET route to the Animal-Crossing NPM for all villagers in database
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
    console.log(currentVillager)
    res.json(currentVillager);
  });

  // DELETE route for deleting villagers from our database
  app.delete("/api/villagers/:id", function (req, res) {
    db.Villager.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbVillager) {
        res.json(dbVillager);
      });
  });
  // PUT route
  // changes from dream list to island writing dreamy value to false
  app.put("/api/villagers/:id", function (req, res) {
    let id = req.params.id
    db.Villager.update(
      { dreamy: 0 },
      {
        where: {
          id: req.params.id,
        },
      }).then(function () {
        db.Villager.findOne(
          {
            where: {
              id: id
            }
          }
        )
          .then(function (dbVillager) {
            res.json(dbVillager);
          });
      });
  });
};