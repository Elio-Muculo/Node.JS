const mongoose = require('../database');
const bcrypt =  require('bcryptjs');
const Book = require('./book');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowerCase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.virtual("books", {
  ref: "Book", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "user", // is equal to foreignField
});

// // Set Object and Json property to true. Default is set to false
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const user = mongoose.model('User', userSchema);

module.exports = user;