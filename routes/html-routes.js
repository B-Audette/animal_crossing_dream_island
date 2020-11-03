var path = require("path");

module.exports = function(app) {

    app.get("/ki", function (req, res){
        res.sendFile(path.join(__dirname,"../public/index2.html"))
    })

}