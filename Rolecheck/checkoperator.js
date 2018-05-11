const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const lme = require("lme");

module.exports = function(req, res, next) {
  let token = (req.get("Authorization") || "").split(" ");
  //lme.i(token);

  if (token[1] === "null" || token[1] === "undefined" || token[1] === null) {
    return res.status(401).send({
      status: "Unauthorized",
      msg: "No Token Present"
    });
  }

  // check for Bearer token

  if (!token[0]) {
    return res.status(401).send({
      status: "Unauthorized",
      msg: "No Token Present"
    });
  }
  if (token[0] != "Bearer") {
    return res.status(401).send({
      status: "Unauthorized",
      msg: "No Token Present"
    });
  }

  let payload = jwt.decode(token[1]);
  jwt.verify(token[1], "secret", function(err, decoded) {
    // lme.i(decoded);

    if (err) {
      return res.status(401).send({
        status: "Unauthorized",
        msg: "Token Expired"
      });
    }

    // lme.i(decoded._id)

    if (decoded.usertype === 'operator') {
      next();
    } else {
        return res.status(401).send({
            status: "Failed",
            msg: "you are not an operator"
        });
    };

    // User.count({ _id: mongoose.Types.ObjectId(decoded._id) }, (err, count) => {
    //   //    lme.i(count);
    //   if (err) {
    //     return res.status(500).send({
    //       status: "Failed",
    //       msg: err
    //     });
    //   }
    //   if (count < 1) {
    //     return res.status(401).send({
    //       status: "Failed",
    //       msg: "No User Found"
    //     });
    //   } else {
    //     res.locals.userId = decoded._id;
    //   }
    //   next();
    // });
  });
};
