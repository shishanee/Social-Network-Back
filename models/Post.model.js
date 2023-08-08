






const mongoose = require("mongoose");
const moment = require('moment');

const postSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  text: String,
  image: [],
  date: {
    type: Date,
    // default: moment().format('D MMM в HH:mm:ss'), 
    default: Date.now
  },
  likes: [
    {
      user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
      },
    },
  ],
  bans: [
    {
      user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
