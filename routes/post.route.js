const { Router } = require("express");
const { postController } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/post", authMiddleware, postController.createPost);
router.get('/post', authMiddleware, postController.getUserPosts);
router.delete('/post/:id', authMiddleware, postController.deletePost);
router.patch('/post/:id', authMiddleware, postController.changePosts);
router.patch('/post/like/:id', authMiddleware, postController.addLike)
router.patch('/post/ban/:id', authMiddleware, postController.addBan)

module.exports = router;