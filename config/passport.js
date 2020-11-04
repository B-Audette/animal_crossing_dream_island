var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/password
passport.use(new LocalStrategy(
  {
    usernameField: "islandName"
  },
  function(islandName, dodo, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        islandName: islandName
      }
    }).then(function(dbUser) {

      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect island name."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validdodo(dodo)) {
        return done(null, false, {
          message: "Incorrect dodo code."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
