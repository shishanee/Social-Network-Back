const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { groupPostController } = require("../controllers/grouppost.controller");
const fileMiddleware = require("../middlewares/file.middleware");


const router= Router();

router.post("/group/post/:id", fileMiddleware.array("img", 4),  groupPostController.createPost);
router.get("/grouposts", groupPostController.allGroupPosts);
router.get("/groupost/:id", groupPostController.getPostId);

module.exports = router;