const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user = require("./routes/user");
const userauthenticator = require("./userauth");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/jwtauth");

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/checking", function(req, res) {
  res.json({
    welcome: "welcome to signup and signin with jwt"
  });
});

app.use("/user", user);


app.listen(PORT, function() {
  console.log("Server is running on Port", PORT);
});
