// Loads the express module
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

// Register Handlebars helpers
hbs.registerHelper('startsWith', function(str, prefix) {
  return str.toString().startsWith(prefix);
});

hbs.registerHelper('concat', function(str1, str2) {
  return str1.toString() + str2.toString();
});

hbs.registerHelper('last', function(str) {
  return str.slice(-1);
});

hbs.registerHelper('eq', function(a, b) {
  return a === b;
});

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/happy", (req, res) => {
  res.render("happy");
});

app.get("/happy", (req, res) => {
  const query = req.query;
  console.log(query);
  res.render("happy", {data: query});
});

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
