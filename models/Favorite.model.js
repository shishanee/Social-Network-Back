const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    post: {
        ref: "Post",
        type: mongoose.SchemaTypes.ObjectId,
    }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;