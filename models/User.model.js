const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  image: String,
  images: [
    {
      type: String,
    },
  ],
  lastName: String,
  followers: [
    {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
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
  favorite: [
    {type : mongoose.SchemaTypes.ObjectId,
    ref : 'Post'
    }
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
