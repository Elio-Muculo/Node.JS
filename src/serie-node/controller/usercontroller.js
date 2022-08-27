const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "email already exists on DB" });

    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id, name: user.name }),
    });
  } catch (error) {
    res.status(400).send({ error: "registration failed" });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).send({ error: "registration failed" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send({ error: "invalid password" });

  user.password = undefined;
  user.__v = undefined;

  return res.send({
    user,
    token: generateToken({ id: user.id, name: user.name }),
  });
};

const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.ACESS_TOKEN_SECRET, { expiresIn: 86400 });
};

module.exports = { register, authenticate };
// module.exports = (app) => app.use("/auth", router);