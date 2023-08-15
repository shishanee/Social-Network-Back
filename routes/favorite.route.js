const { Router } = require("express");
const { favoriteController } = require("../controllers/favorite.controller");


const router = Router();

router.get("/favorite", favoriteController.getPosts);
router.post("/favorite", favoriteController.addPostInFavorite)
router.delete("/favorite", favoriteController.deletePostInFavorite)


module.exports = router;

