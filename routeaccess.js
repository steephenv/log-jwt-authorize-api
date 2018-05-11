const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const mongoose = require("mongoose");
const lme = require("lme");
const Userrole = require("./models/userrole");


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
     lme.i(decoded);
    // console.log(req.url);

    if (err) {
      return res.status(401).send({
        status: "Unauthorized",
        msg: "Token Expired"
      });
    }

    // let role = new Userrole({
    //     endpoint: '/signin',
    //     roles:['admin','member']
    //   });
    //   role.save().then(data => {
    //     lme.i('success', data)
    //   });


    Userrole.count({endpoint: req.url,roles: decoded.usertype}).then(
       
        count => {
            console.log(req.url);
            console.log(decoded.usertype);
          //lme.i(count);
          if (err) {
            return res.status(500).send({
              status: "Failed",
              msg: err
            });
          }
          if (count < 1) {
            return res.status(401).send({
              status: "Failed",
              msg: "No Acceess"
            });
          } else {
            res.locals.userId = decoded._id;
            // Userrole.findOne({endpoint: req.url,roles: decoded.usertype}).then(data =>{
                
            //     console.log(data);
             
            // })
            next();
          }
        });
  });
};

