const Comment = require("../models/Comment.model");

module.exports.commentController = {
  createComment: async (req, res) => {
    const data = await Comment.create({
      post: req.params.id,
      user: req.user.id,
      text: req.body.text,
    });
    res.json(data);
  },

  getUserComments: async (req, res) => {
    const data = await Comment.find({ user: req.user.id }).populate('user').populate('post')
    // .populate('likes.user', '-password -groups -posts -friends -followers -__v')
    // .populate('bans.user', '-password -groups -posts -friends -followers -__v');
    res.json(data);
  },

  getPostComments: async (req, res) => {
    const data = await Comment.find( { post: req.params.id }).populate('user').populate('post')
    res.json(data)
  },
  
}