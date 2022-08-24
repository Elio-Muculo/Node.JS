const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const user = require("../models/user");
const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      user: "6303b8d64ada4672c2ae28b5",
    });
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/user/:id", async (req, res) => {
  const book = await User.findById(req.params.id).populate('books');
  
  book.__v = undefined;
  res.status(200).json({ sucess: true, data: book });

  console.log(book);
  console.log(book.id);
});

module.exports = (app) => app.use("/api", router);


