const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  text: String,
  image: String,
  date: {
        type: Date,
        default: Date.now()
    },
  likes: [
    {user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId
    }}
  ],
  bans: [
    {user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId
    }}
  ]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;