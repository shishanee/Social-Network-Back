const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post("/auth", userController.registerUser); // Роут регистрации пользователя
router.post("/login", userController.login); // Вход в учетную запись
router.get("/user", authMiddleware, userController.getUser); // Вывод пользователя
router.get("/user/:id", userController.oneUser); // вывод одного пользователя
router.get("/users", userController.allUsers); // все пользователи
router.patch("/addfollow", authMiddleware, userController.addFollow); // Подписаться
router.patch("/user", authMiddleware, userController.changeUser); // Изменение юзера
router.patch("/deletefollow", authMiddleware, userController.deleteFollow); // Отписаться
router.patch("/deletefriends", authMiddleware, userController.deleteFriends); // Отписать
router.patch("/follow/group/:id", authMiddleware, userController.followGroup); //Подписка на группу
router.patch(
  "/unsubscribe/group/:id",
  authMiddleware,
  userController.unsubscribeGroup
); //отписка от группы
router.patch(
  "/addimage",
  authMiddleware,
  fileMiddleware.single("img"),
  userController.addImage
); // добавление фото
router.get("/allimages", authMiddleware, userController.findImages); // вывод фото
router.get("/onepeopleimage/:id", userController.onePeopleImage); // вывод всех фото одного пользователя
router.patch(
  "/editimage",
  fileMiddleware.single("img"),
  authMiddleware,
  userController.editImage
); // изменение авы

module.exports = router;
