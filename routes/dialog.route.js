const { Router } = require("express");
const { dialogController } = require("../controllers/dialog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/createDialog", authMiddleware, dialogController.createDialog); // создание чата
router.get("/oneDialog/:id", dialogController.oneDialog); // создание чата
router.patch("/addmessage/:id", authMiddleware, dialogController.addMessage); // отправка сообщения
router.get("/getDialogs", dialogController.getDialogs); // вывод всех диалогов

module.exports = router;
