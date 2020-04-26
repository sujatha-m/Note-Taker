// need express to interact with the front end
var express = require("express");
//creating an express server
var app = express();
//sets initial port for listners
var PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

//require routes
 require("./routes/apiRoutes")(app);
 require("./routes/htmlRoutes")(app);

//starts the server on the port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });


