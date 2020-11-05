const path = require("path");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));

    app.get("/signup", function(req, res) {
      if (req.user) {
        res.redirect("/home");
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
    app.get("/home", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
});
}




// ======= FUTURE ROUTES FOR PASSPORT SESTUP TO REDIRECT BASED ON AUTHENTICATED ======


// module.exports = function(app) {

//     app.get("/signup", function(req, res) {

//       if (req.user) {
//         res.redirect("/home");
//       }
//       res.sendFile(path.join(__dirname, "../public/signup.html"));
//     });
  
//     app.get("/login", function(req, res) {
//       if (req.user) {
//         res.redirect("/home");
//       }
//       res.sendFile(path.join(__dirname, "../public/login.html"));
//     });
  
//     app.get("/home", isAuthenticated, function(req, res) {
//       res.sendFile(path.join(__dirname, "../public/home.html"));
//     });

//     app.get("*", function(req, res) {
//         if (req.user) {
//           res.redirect("/home");
//         } else 
//         res.redirect("/login");
//       });
  
//   };