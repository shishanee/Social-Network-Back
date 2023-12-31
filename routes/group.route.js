const { Router } = require("express");
const { groupController } = require("../controllers/group.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/group",  groupController.createGroup); // создание группы
router.get("/group", groupController.getGroup); // вывод группы
router.get("/group/:id", groupController.getOneGroup); //вывод одной группы по id

module.exports = router;
