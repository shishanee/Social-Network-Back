const Favorite = require("../models/Favorite.model");

module.exports.favoriteController = {
    getPosts: async (req, res) => {
     const data = await Favorite.find();
     res.json(data);
    },
    addPostInFavorite : async (req, res)=> {
        const posts = await Favorite.create({
            post: req.body.post
        }) 
        res.json(posts)
    },
    deletePostInFavorite : async ( req, res) =>{
        try {
            await Favorite.findByIdAndDelete(req.body.post)
            res.json('Удалено')
        } catch (error) {
            res.json('Х1ар пал хил '+ error)
        }
    }

}
