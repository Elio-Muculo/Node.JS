const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const router = express.Router();

router.post("/book", async (req, res) => {
  const { title } = req.body;
  try {
    if (await Book.findOne({ title }))
      return res.status(400).send({ error: "the book already exists." });

    const book = await Book.create(req.body);
    return res.send({ book });
  } catch (error) {
    res.status(400).send({ error: "registration failed" });
  }
});

router.get("/user/:id", async (req, res) => {
  User.find({ user: req.params.id })
    .populate('books')
    .exec(function (err, products) {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message:
              "Products not found with given Company Id " +
              req.params.companyId,
          });
        }
        return res.status(500).send({
          message:
            "Error retrieving Products with given Company Id " +
            req.params.companyId,
        });
      }

      res.send({ products });
    });
});

module.exports = (app) => app.use("/api", router);
