const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { post, use } = require("../routes/group.route");

module.exports.userController = {
  // Регистрация пользователя
  registerUser: async (req, res) => {
    const {
      posts,
      groups,
      friends,
      age,
      followers,
      firstName,
      lastName,
      email,
      number,
      password,
    } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(401).json({
        error: "Пользователь с таким Email или Номером уже существует",
      });
    }

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      number: number,
      email: email,
      groups,
      friends,
      followers,
      age,
      password: hash,
      posts: posts,
    });

    res.json(user);
  },
  // Вход в учетную запись
  login: async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email: email });
    if (!candidate) {
      return res.status(401).json({ error: "Неверный Email или пароль" });
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный Email или пароль" });
    }
    const payload = {
      id: candidate._id,
      email: candidate.email,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "72h",
    });

    res.json(token);
  },
  // вывод одного пользователя
  getUser: async (req, res) => {
    const data = await User.findById(req.user.id)
      .populate("friends")
      .populate("followers")
      .populate('groups')
    res.json(data);
  },
  oneUser: async (req, res) => {
    const data = await User.findById(req.params.id)
      .populate("friends")
      .populate("followers")
      .populate("groups");
    res.json(data);
  },

  addFollow: async (req, res) => {
    const data = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { friends: req.body.friends } },
      { new: true }
    ).populate("friends");

    const newUser = await User.findByIdAndUpdate(
      req.body.friends,
      { $addToSet: { followers: req.user.id } },
      { new: true }
    );

    res.json(newUser);
  },
  allUsers: async (req, res) => {
    const data = await User.find();
    res.json(data);
  },

  changeUser: async (req, res) => {
    const data = await User.findByIdAndUpdate(req.user.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      number: req.body.number,
      age: req.body.age,
    });
    res.json(data);
  },
  deleteFollow: async (req, res) => {
    const data = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { friends: req.body.friends } },
      { new: true }
    ).populate("friends");

    const newUser = await User.findByIdAndUpdate(
      req.body.friends,
      { $pull: { followers: req.user.id } },
      { new: true }
    );

    res.json(newUser);
  },
  deleteFriends: async (req, res) => {
    const data = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { followers: req.body.followers } },
      { new: true }
    ).populate("friends");

    const newUser = await User.findByIdAndUpdate(
      req.body.followers,
      { $pull: { friends: req.user.id } },
      { new: true }
    );

    res.json(newUser);
  },
  followGroup: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { groups: req.params.id } },
        { new: true }
      ).populate("groups");

      const Data = await Group.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { followers: req.user.id } },
        { new: true }
      );
      res.json(Data);
    } catch (error) {
      res.json(error.message);
    }
  },
  addImage: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: { images: req.file.path },
        },
        { new: true }
      ).populate('images')

      res.json(data.images);
    } catch (error) {
      res.json(error.message);
    }
  },
  findImages: async (req, res) => {
    try {
      const data = await User.findById(req.user.id).populate("images");
      res.json(data.images);
    } catch (error) {
      res.json(error.message);
    }
  },
  onePeopleImage: async(req,res) => {
    try {
      const data = await User.findById(req.params.id).populate('images')
      res.json(data.images)
    } catch (error) {
      res.json(error.message);
      
    }
  },

  unsubscribeGroup: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { groups: req.params.id } },
        { new: true }
      ).populate("groups");

      const Data = await Group.findByIdAndUpdate(
        req.params.id,
        { $pull: { followers: req.user.id } },
        { new: true }
      );

      res.json(Data);
    } catch (error) {
      res.json(error.message);
    }
  },
};
