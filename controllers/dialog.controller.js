const Dialog = require("../models/Dialog.model");

module.exports.dialogController = {
  // вывод одного диалога
  oneDialog: async (req, res) => {
    const data = await Dialog.find({ _id: req.params.id })
      .populate("you")
      .populate("user")
      .populate("messages.sender");
    res.json(data);
  },

  deleteDialog: async (req, res) => {
    const data = await Dialog.findByIdAndRemove(req.params.id);
    res.json(data);
  },

  // вывод всех диалогов
  getDialogs: async (req, res) => {
    const data = await Dialog.find()
      .populate("you")
      .populate("user")
      .populate("messages.sender");
    res.json(data);
  },
  // создание чата
  createDialog: async (req, res) => {
    const date = await Dialog.find().populate("you").populate("user");
    const newDate = date.find((item) => {
      if (item.user.id === req.body.user) {
        return item;
      }
    });
    const newData = await Dialog.find().populate("you").populate("user");

    if (newDate) {
      return res.json(newData);
    }
    const data = await Dialog.create({
      you: req.user.id,
      user: req.body.user,
    });
    const newData1 = await Dialog.find().populate("you").populate("user");

    res.json(newData1);
  },
  // отправка сообщения
  addMessage: async (req, res) => {
    const newMessage = {
      date: new Date().toISOString(),
      text: req.body.text,
      sender: req.user.id,
    };

    try {
      const data = await Dialog.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { messages: newMessage },
        },
        { new: true }
      )
        .populate("messages.sender")
        .populate("you")
        .populate("user");

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add message" });
    }
  },
};
