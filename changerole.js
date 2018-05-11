const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const mongoose = require("mongoose");
const lme =require("lme");

module.exports = function(req, res) {
 // lme.i("accessed changerole");
  lme.i(req.body.userId);
  //   lme.i(res.locals.userId);
  User.findByIdAndUpdate({_id : req.body.userId}, {
     $set: { usertype: req.body.usertype }}).then(user => {
         lme.i(user);
        return res.status(200).send({
            status: 'Success',
            msg : 'updation successful'

        });
    });
   
  

  //   User.findById({ _id: mongoose.Types.ObjectId(req.body.userId) }).then(
  //     data => {
  //       const user = new User({
  //         _id: new mongoose.Types.ObjectId(),
  //         email: req.body.email,
  //         usertype: req.body.usertype,
  //         password: hash
  //       });
  //       user
  //         .save()
  //         .then(function(result) {
  //           lme.i(result);
  //           res.status(200).json({
  //             success: "New user has been created"
  //           });
  //         })
  //         .catch(error => {
  //           res.status(500).json({
  //             error: err
  //           });
  //         });

  //       //   lme.i(data);
  //       //   if (data) {
  //       //     return res.status(200).send({
  //       //       status: "ok",
  //       //       msg: "user found"
  //       //     });
  //       //   }
  //     }
  //   );
};
