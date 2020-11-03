// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================


var db = require("../models");
const { villagers } = require("animal-crossing")

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the villagers
  app.get("/api/villagers", function(req, res) {
    db.Villager.findAll()
      .then(function(dbVillager) {
        res.json(dbVillager);
      });
  });

  app.post("/api/villagers", function(req, res) {
    db.Villager.create(req.body)
      .then(function() {
        res.status(200).end();
      });
  });

  app.get("/api/all_villagers", function(req, res){

    res.json(villagers);

  })
};