const Group = require("../models/Group.model");

module.exports.groupController = {
  createGroup: async (req, res) => {
    const { name, discription, followers, posts, user } = req.body;
    const data = await Group.create({
      name,
      user,
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
  getOneGroup: async (req, res) => {
    const data= await Group.findById(req.params.id);

    res.json(data)
  }
};
