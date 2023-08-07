const { Router } = require("express");
const { commentController } = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/comment/:id", authMiddleware, commentController.createComment);
router.get('/comment', authMiddleware, commentController.getUserComments);
router.get('/comment/:id', authMiddleware, commentController.getPostComments)
// router.delete('/comment/:id', authMiddleware, commentController.deleteComment);
// router.patch('/post/:id', authMiddleware, postController.changePosts);
// router.patch('/post/like/:id', authMiddleware, postController.addLike)
// router.patch('/post/ban/:id', authMiddleware, postController.addBan)

module.exports = router;