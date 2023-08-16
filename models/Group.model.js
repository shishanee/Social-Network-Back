const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  name: String,
  discription: String,
  image: String,
  followers: [
    {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  posts: [
    {
      ref: "GroupPost",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;