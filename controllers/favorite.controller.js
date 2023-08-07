const Favorite = require("../models/Favorite.model");

module.exports.favoriteController = {
    getPosts: async (req, res) => {
     const data = await Favorite.find();
     res.json(data);
    }
}
