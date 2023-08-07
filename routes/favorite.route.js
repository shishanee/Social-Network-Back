const { Router } = require("express");
const { favoriteController } = require("../controllers/favorite.controller");


const router = Router();

router.get("/favorite", favoriteController.getPosts);

module.exports = router;

