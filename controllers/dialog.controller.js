const Dialog = require("../models/Dialog.model");

module.exports.dialogController = {
  // вывод всех диалогов
  getDialogs: async (req,res) => {
    const data = await Dialog.find().populate('you').populate('user')
    res.json(data)
  },
  // создание чата
  createDialog: async (req, res) => {
    const data = await Dialog.create({
      you: req.user.id,
      user: req.body.user,
    });
    res.json(data);
  },
  // отправка сообщения
  addMessage: async (req, res) => {
    const newMessage = {
      date: new Date().toISOString(),
      text: req.body.text,
      sender: req.user.id,
    };

    try {
      const data = await Dialog.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { messages: newMessage },
        },
        { new: true }
      );

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add message" });
    }
  },
};
