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

  getAllComments: async (req, res) => {
    const data = await Comment.find()
    .populate('user');
    res.json(data)
  },

  getUserComments: async (req, res) => {
    const data = await Comment.find({ user: req.user.id })
    .populate('user').populate('post')
    res.json(data);
  },

  getPostComments: async (req, res) => {
    const data = await Comment.find({post: req.params.id} ).populate('user').populate('post')
    res.json(data)
  },

  deleteComment: async (req, res) => {
    const data = await Comment.findByIdAndRemove({_id: req.params.id});
    res.json('comment deleted')
  },

  updateComment: async (req, res) => {
    const data = await Comment.findByIdAndUpdate(req.params.id, {
      text: req.body.text
    });
    res.json(data)
  },

  openComments: async (req, res) => {
    const open = req.body;
    const data = await Comment.findByIdAndUpdate(req.params.id, {
     open: !open
    }, {new: true})
    res.json(data)
  }
  
}