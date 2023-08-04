const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post("/auth", userController.registerUser); // Роут регистрации пользователя
router.post("/login", userController.login); // Вход в учетную запись
router.get("/user", authMiddleware, userController.getUser); // Вывод пользователя
router.get('/users', userController.allUsers) // все пользователи
router.get('/allfollow', authMiddleware, userController.allFollow) // Все подписки
router.patch('/addfollow', authMiddleware, userController.addFollow) // Подписаться
router.patch('/user', authMiddleware, userController.changeUser) // Изменение юзера

module.exports = router;
