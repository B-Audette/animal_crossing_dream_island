// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The island name cannot be null
    islandName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isislandName: true
      }
    },
    // The dodo cannot be null
    dodo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed dodo entered by the user can be compared to the hashed dodo stored in our database
  User.prototype.validdodo = function(dodo) {
    return bcrypt.compareSync(dodo, this.dodo);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their dodo
  User.addHook("beforeCreate", function(user) {
    user.dodo = bcrypt.hashSync(user.dodo, bcrypt.genSaltSync(10), null);
  });
  return User;
};
