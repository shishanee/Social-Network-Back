const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  image: String,
  lastName: String,
  number: String,
  email: String,
  password: String,
  age: String,
  posts: [
    {
      ref: "Post",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  groups: [
    {
      ref: "Group",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  friends: [
    {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
