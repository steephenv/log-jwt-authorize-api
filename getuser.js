const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const mongoose = require("mongoose");
const lme = require("lme");

module.exports = function(req, res) {
  lme.i(res.locals.userId);
  User.findById({ _id: mongoose.Types.ObjectId(res.locals.userId) }).then(
    data => {
      lme.i(data);
      if (data) {
        return res.status(200).send({
          status: "ok",
          msg: "user found"
        });
      }
    }
  );
};
