const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  post: {
    ref: "Post",
    type: mongoose.SchemaTypes.ObjectId
  },
  text: String,
  date: {
    type: Date,
    default: Date.now()
},
})


  const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;