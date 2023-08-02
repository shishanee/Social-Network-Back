const Group = require("../models/Group.model");

module.exports.groupController = {
  createGroup: async (req, res) => {
    const { name, discription, followers, posts } = req.body;
    const data = await Group.create({
      user: req.user.id,
      name,
      discription,
      followers,
      posts,
    });
    res.json(data);
  },
  getGroup: async (req, res) => {
    const data = await Group.find();
    res.json(data);
  },
};
