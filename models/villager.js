// Import the ORM to create functions that will interact with the database.
// this is good as is
const { villagers } = require("animal-crossing")
console.log(villagers[3].name, villagers[3].species, villagers[3].personality, villagers[3].hobby)


const orm = require("../config/orm.js");


let villager = {
  all: function(cb) {
    orm.all("villagers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("villagers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("villagers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("villagers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (subjectController.js).

module.exports = villager;
