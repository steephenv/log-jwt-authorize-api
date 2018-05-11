const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const lme = require("lme");
const User = require("../models/user.model");
const userauth = require("../userauth");
const getuser = require("../getuser");
const checkadmin = require("../Rolecheck/checkadmin");
const changerole = require("../changerole");
const checkoperator = require("../Rolecheck/checkoperator");
const checkmember = require("../Rolecheck/checkmember");
const samplemember = require("../samplemember");
const sampleoperator = require("../sampleoperator");
const routeaccess = require("../routeaccess");

router.get("/getuser", routeaccess, getuser);
router.post("/changerole", routeaccess, changerole);
//router.get("/operatoraccess",checkoperator,sampleoperator);
//router.get("/memberaccess",checkmember,samplemember);

router.post("/signup", function(req, res) {
  lme.i(req.body);
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        usertype: "member",
        password: hash
      });
      user
        .save()
        .then(function(result) {
          lme.i(result);
          res.status(200).json({
            success: "New user has been created"
          });
        })
        .catch(error => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

router.post("/signin", function(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          return res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
        if (result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
              _id: user._id,
              usertype: user.usertype
            },
            "secret",
            {
              expiresIn: "8h"
            }
          );
          lme.i(JWTToken);
          return res.status(200).json({
            success: "successfully signed in",
            token: JWTToken
          });
        }
        return res.status(401).json({
          failed: "Unauthorized Access"
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

module.exports = router;
