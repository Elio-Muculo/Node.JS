const { Schema } = require('mongoose')
const mongoose = require("../database");
const User = require("./user");

const bookSchema = mongoose.Schema({
  title: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


