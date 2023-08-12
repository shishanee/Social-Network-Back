const { Router } = require("express");
const { commentController } = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post("/comment/:id", authMiddleware, fileMiddleware.array('img', 2), commentController.createComment);
router.get("/comment/all", commentController.getAllComments)
router.get('/comment', authMiddleware, commentController.getUserComments);
router.get('/comment/:id', authMiddleware, commentController.getPostComments)
router.delete('/comment/:id', authMiddleware, commentController.deleteComment);
router.patch('/comment/:id', authMiddleware, commentController.updateComment);
router.patch('/comment/like/:id', authMiddleware, commentController.addLike)

module.exports = router;