require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { route } = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use("/images", express.static(__dirname + "/images"));
app.use(cors());

app.use(require('./routes/user.route'))
app.use(require('./routes/group.route'))
app.use(require('./routes/dialog.route'))
app.use(require('./routes/post.route'))
app.use(require('./routes/comment.route'))
app.use(require('./routes/grouppost.route'))
app.use(require('./routes/favorite.route'))

mongoose
  .connect(
    process.env.MONGO,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен успешно на порте ${process.env.PORT}`);
});
