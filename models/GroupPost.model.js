const mongoose = require("mongoose");

const groupPostSchema = mongoose.Schema({
    group: {
        ref: "Group",
        type: mongoose.SchemaTypes.ObjectId
    },
    text: String,
    image: [],
    date: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
          user: {
            ref: "User",
            type: mongoose.SchemaTypes.ObjectId
          }
        }
    ],
    bans: [
        {
            user: {
                ref: "User",
                type: mongoose.SchemaTypes.ObjectId,
            }
        }
    ]
});

const GroupPost = mongoose.model("GroupPost", groupPostSchema);
module.exports = GroupPost;