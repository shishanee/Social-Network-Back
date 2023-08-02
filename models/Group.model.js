const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  name: String,
  discription: String,
  followers: [
    {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  posts: [
    {
      ref: "Post",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
