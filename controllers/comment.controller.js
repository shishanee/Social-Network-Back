const Comment = require("../models/Comment.model");

module.exports.commentController = {
  createComment: async (req, res) => {
    const data = await Comment.create({
      post: req.params.id,
      user: req.user.id,
      text: req.body.text,
      image: req.files,
    })
    res.json(data);
  },

  getAllComments: async (req, res) => {
    const data = await Comment.find().populate("user");
    res.json(data);
  },

  getUserComments: async (req, res) => {
    const data = await Comment.find({ user: req.user.id })
      .populate("user")
      .populate("post");
    res.json(data);
  },

  getPostComments: async (req, res) => {
    const data = await Comment.find({ post: req.params.id })
      .populate("user")
      .populate("post");
    res.json(data);
  },

  deleteComment: async (req, res) => {
    const data = await Comment.findByIdAndRemove({ _id: req.params.id });
    res.json("comment deleted");
  },

  updateComment: async (req, res) => {
    const data = await Comment.findByIdAndUpdate(req.params.id, {
      text: req.body.text,
    });
    res.json(data);
  },

  addLike: async (req, res) => {
    const { id } = req.user;

    await Comment.findById(req.params.id)
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({ message: "Пост не найден" });
        }

        const userIndex = comment.likes.findIndex(
          (like) => like.user.toString() === id
        );

        if (userIndex === -1) {
          comment.likes.push({ user: id });
        } else {
          comment.likes.splice(userIndex, 1);
        }
        comment
          .save()
          .then((updatedComment) => {
            res.status(200).json(updatedComment);
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: "Произошла ошибка при обновлении поста" });
          });
      })
      .catch((error) => {
        res.status(500).json({ message: "Произошла ошибка при поиске поста" });
      });
  },
};
