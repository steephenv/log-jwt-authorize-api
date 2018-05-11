const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user = require("./routes/user");
const userauthenticator = require("./userauth");
const mongoose = require("mongoose");
const lme = require("lme");

var multer = require("multer");
var upload = multer({ dest: 'uploads'});

//console.log(appRoot);
mongoose.connect("mongodb://localhost/jwtauth");

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signup/profile', upload.single('filedata'), (req,res) => {
  res.json({success:"success"});
  console.log("uploaded successfully");
});

app.get("/checking", function(req, res) {
  res.json({
    welcome: "welcome to signup and signin with jwt"
  });
});

app.use("/user", user);

app.listen(PORT, function() {
  lme.i("Server is running on Port", PORT);
});

