const { Router } = require("express");
const { postController } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post(
  "/post",
  authMiddleware,
  fileMiddleware.array("img", 4),
  postController.createPost
);
router.get("/post", authMiddleware, postController.getUserPosts);
router.get("/post/:id", authMiddleware, postController.getOnePost);
router.delete("/post/:id", authMiddleware, postController.deletePost);
router.patch("/post/:id", authMiddleware, postController.changePosts);
router.patch("/post/like/:id", authMiddleware, postController.addLike);
router.patch("/post/ban/:id", authMiddleware, postController.addBan);
router.get("/getposts/:id", postController.getPosts);
router.get("/allposts", postController.getAllPost); // вывод всех постов
router.get("/onePost/:id", postController.onePost); // вывод одного поста
module.exports = router;
