const mongoose = require("mongoose");


const UserRole = mongoose.Schema({
  endpoint: { type: String },
  roles: []
});

module.exports = mongoose.model("UserRole", UserRole);

