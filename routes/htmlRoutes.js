// need path for filename paths
const path = require("path");

module.exports = function(app) {
  // HTML GET Requests
  // Web page when the Get started button is clicked
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    // If no matching route is found default to home
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };
  