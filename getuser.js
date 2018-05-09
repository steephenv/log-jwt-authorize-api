const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const mongoose = require("mongoose");

module.exports = function(req, res) {
  console.log(res.locals.userId);
  User.findById({ _id: mongoose.Types.ObjectId(res.locals.userId) }).then(
    data => {
      console.log(data);
      if (data) {
        return res.status(200).send({
          status: "ok",
          msg: "user found"
        });
      }
    }
  );
};
