const mongoose = require("mongoose");

const dialogSchema = mongoose.Schema({
  you: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  messages: [
    {
      date: String,
      text: String,
      sender: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
      },
    },
  ],
});

const Dialog = mongoose.model("Dialog", dialogSchema);
module.exports = Dialog;
