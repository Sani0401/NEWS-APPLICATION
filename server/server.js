const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
// Import the 'cors' middleware
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const readLaterSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  articleLink: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const ReadLater = mongoose.model("ReadLater", readLaterSchema);

app.post("/login", async (req, res) => {
  const body = req.body;
  var userID = body.username;
  var password = body.password;
  const user = await User.find({ username: userID });

  if (user) {
    res.status(200).json({ loggedUser: user });
  }
});

app.post("/search", async (req, res) => {
  var keyWord = req.body;
  const token = keyWord.query;
  console.log(token);
  axios
    .get(
      `https://newsapi.org/v2/everything?q=${token}&apiKey=b84e25ac5e4a40d0a9ee98e15f8b284d`
    )
    .then((response) => {
      console.log("Data Fetched sucessfully");
      res.json(response.data);
    })
    .catch((error) => {
      console.error("erro", error.message);
    });
});

app.post("/addArticle", async (req, res) => {
  const body = req.body;
  console.log(body);
  const userId = body.userId; // Fix this line
  console.log(userId);
  const newArticle = new ReadLater({
    userId: userId,
    title: body.article.title,
    description: body.article.description,
    imageLink: body.article.urlToImage,
    articleLink: body.article.articleLink,
  });

  try {
    const savedArticle = await newArticle.save();

    res
      .status(201)
      .json({ message: "Article added successfully", article: savedArticle });
  } catch (error) {
    // Handle errors
    console.error("Error adding article:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getAllData", async (req, res) => {
  try {
    const allData = await ReadLater.find();

    res.status(200).json({ allData });
  } catch (error) {
    console.error("Error fetching all data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
