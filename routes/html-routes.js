const path = require("path");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
      if (req.user) {
        res.redirect("/index");
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
  
    app.get("/login", function(req, res) {
      if (req.user) {
        res.redirect("/index");
      }
      res.sendFile(path.join(__dirname, "../public/login.html"));
    });
  
    app.get("/index", isAuthenticated, function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  
  };