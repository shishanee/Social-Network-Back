const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  number: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
