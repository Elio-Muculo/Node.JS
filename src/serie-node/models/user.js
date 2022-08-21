const mongoose = require('../database');
const bcrypt =  require('bcryptjs');
const Book = require('./book');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowerCase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const user = mongoose.model('User', userSchema);

module.exports = user;