let express = require("express");
let api_routes = require("./routes/api");
let path = require("path");

// Creating the web application
let app = express();

let vueClientPath = path.join(__dirname, "student-sign-in-client", "dist");
app.use(express.static(vueClientPath));

// For handling JSON requests, convert data to JS
app.use(express.json());

app.use("/api", api_routes);

app.use(function (req, res, next) {
  // respond with a 404 to any other requests
  res.status(404).send("Not Found");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

// Starting the web sever
let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Express server running on port ", server.address().port);
});
