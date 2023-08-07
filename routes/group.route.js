const { Router } = require("express");
const { groupController } = require("../controllers/group.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/group", authMiddleware, groupController.createGroup); // создание группы
router.get("/group", groupController.getGroup); // вывод группы

module.exports = router;
