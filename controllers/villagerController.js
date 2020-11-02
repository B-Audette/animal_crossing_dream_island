const express = require("express");

const router = express.Router();

const villager = require("../models/villager.js");

router.get("/", function(req, res) {
  villager.all(function(data) {
    let hbsObject = {
      villagers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/villagers", function(req, res) {
  villager.create([
    "villager_name", "dreamy"
  ], [
    req.body.villager_name, req.body.dreamy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/villagers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  villager.update({
    dreamy: req.body.dreamy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/villagers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  villager.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
