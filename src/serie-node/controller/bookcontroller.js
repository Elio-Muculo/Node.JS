const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const user = require("../models/user");
const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      user: "63028971f21319e842c9c4e1",
    });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/user/:id", async (req, res) => {
  const book = await User.find({ _id: req.params.id }).populate("books");
  res.status(200).json({ sucess: true, data: book });
});

module.exports = (app) => app.use("/api", router);
