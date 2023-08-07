const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    posts: [
        {
            ref: "Post",
            type: mongoose.SchemaTypes.ObjectId,
        }
    ]
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;