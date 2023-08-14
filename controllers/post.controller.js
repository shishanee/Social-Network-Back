const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

module.exports.postController = {
  createPost: async (req, res) => {
    const data = await Post.create({
      user: req.user.id,
      text: req.body.text,
      image: req.files,
    });

    const newData = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { posts: data._id },
      },
      { new: true }
    ).populate("posts");

    res.json(data);
  },
  getAllPost:async (req,res) => {
    const data = await Post.find().populate('user')
    res.json(data)
  },
  getPosts: async (req, res) => {
    const data = await Post.find({ user: req.params.id }).populate("user");
    res.json(data);
  },

  getUserPosts: async (req, res) => {
    const data = await Post.find({ user: req.user.id })
      .populate("user")
      .populate("image")
      .populate(
        "likes.user",
        "-password -groups -posts -friends -followers -__v"
      )
      .populate(
        "bans.user",
        "-password -groups -posts -friends -followers -__v"
      );
    res.json(data);
  },

  getOnePost: async (req, res) => {
    const data = await Post.findById(req.params.id);
    // .populate('likes.user', '-password -groups -posts -friends -followers -__v')
    // .populate('bans.user', '-password -groups -posts -friends -followers -__v');
    res.json(data);
  },

  changePosts: async (req, res) => {
    const data = await Post.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        image: req.body.image,
      },
      { new: true }
    );
    res.json(data);
  },

  deletePost: async (req, res) => {
    const comment = await Comment.deleteMany({ post: req.params.id });
    const data = await Post.findByIdAndRemove(req.params.id, {
      user: req.user.id,
    });
    res.json("post deleted");
  },

  addLike: async (req, res) => {
    // const newData = await Post.findByIdAndUpdate(
    //   req.params.id,
    //   { $push: { likes: { user: req.user.id } } },
    //   { new: true }
    // )
    //   .then((updatedPost) => {
    //     if (updatedPost) {
    //       res.status(200).json(updatedPost);
    //     } else {
    //       res.status(404).json({ message: "Пост не найден" });
    //     }
    //   })
    //   .catch((error) => {
    //     res
    //       .status(500)
    //       .json({ message: "Произошла ошибка при добавлении лайка к посту" });
    //   });

    const { id } = req.user;

    await Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: "Пост не найден" });
        }

        const userIndex = post.likes.findIndex(
          (like) => like.user.toString() === id
        );

        if (userIndex === -1) {
          post.likes.push({ user: id });
        } else {
          post.likes.splice(userIndex, 1);
        }
        post
          .save()
          .then((updatedPost) => {
            res.status(200).json(updatedPost);
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

  addBan: async (req, res) => {
    const { id } = req.user;

    await Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: "Пост не найден" });
        }

        const userIndex = post.bans.findIndex(
          (ban) => ban.user.toString() === id
        );

        if (userIndex === -1) {
          post.bans.push({ user: id });
        } else {
          post.bans.splice(userIndex, 1);
        }
        post
          .save()
          .then((updatedPost) => {
            res.status(200).json(updatedPost);
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
