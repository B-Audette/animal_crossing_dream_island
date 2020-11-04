var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes){

    var Villager = sequelize.define("Villager",{
        name: DataTypes.STRING,
        dreamy: DataTypes.BOOLEAN
    })
   
    return Villager;
};

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        islandName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIslandName: true
          }
        },
        // The password cannot be null
        dodo: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
      // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
      User.prototype.validdodo = function(dodo) {
        return bcrypt.compareSync(dodo, this.dodo);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.addHook("beforeCreate", function(user) {
        user.dodo = bcrypt.hashSync(user.dodo, bcrypt.genSaltSync(10), null);
      });
      return User;

}