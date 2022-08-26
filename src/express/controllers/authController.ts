const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs/promises');
const path =  require('path');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  // check for duplicate users
  const duplicate = userDB.users.find((person) => person.username === user);

  if (duplicate)
    return res.status(409).json({ message: "users already exist" }); // conflict

  try {
    // encrypt
    const hashPwd = await bcrypt.hash(pwd, 10);

    // store the new user
    const newUser = { username: user, password: hashPwd };
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ sucess: `new user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const foundUser = userDB.users.find((person) => person.username === user);
  // if not found user
  if (!foundUser) return res.sendStatus(401); // unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs
    const acessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACESS_TOKEN_SECRET,
      { expiresIn: "40s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'user.json'),
        JSON.stringify(userDB.users)
    );
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ acessToken });
  } else {
    res.status(401);
  }
};

module.exports = { handleNewUser, handleLogin };