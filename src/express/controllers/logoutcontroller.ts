const userdb = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fs = require("fs/promises");
const pt = require("path");

const handleLogout = async (req, res) => {
  // on client, also delete acessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshTokens = cookies.jwt;

  const foundUser = userdb.users.find(
    (person) => person.refreshToken === refreshTokens
  );
  // if not found user
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.sendStatus(204);
  }

  // delete the refresh token in db
  const othersusers = userdb.users.filter(person => person.refreshToken != foundUser.refreshToken);
  const currentsUser = {...foundUser, refreshTokens: ''};
  userdb.setUsers([...othersusers, currentsUser]);
  await fs.writeFile(
    pt.join(__dirname, '..', 'model', 'user.json'),
    JSON.stringify(userdb.users)
  ); 

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.sendStatus(204);
};

module.exports = { handleLogout };
