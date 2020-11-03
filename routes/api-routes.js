// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================


var db = require("../models");
const { villagers } = require("animal-crossing")

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the villagers
  app.get("/api/villagers", function (req, res) {
    db.Villager.findAll()
      .then(function (dbVillager) {
        res.json(dbVillager);
      });
  });

  app.post("/api/villagers", function (req, res) {
    db.Villager.create(req.body)
      .then(function () {
        res.status(200).end();
      });
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
};