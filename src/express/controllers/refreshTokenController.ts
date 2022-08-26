const userDb = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwToken = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshTokens = cookies.jwToken;

  const foundUser = userDb.users.find(
    (person) => person.refreshToken === refreshTokens
  );
  // if not found user
  if (!foundUser) return res.sendStatus(403); // unauthorized

  // evaluate jwt
  jwToken.verify(
    refreshTokens,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if ( err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const acessTokens = jwToken.sign(
            { "username": decoded.username },
            process.env.ACESS_TOKEN_SECRET,
            { expiresIn: '40s' }
        );
        res.json({ acessTokens });
    }
  );
};

module.exports = { handleRefreshToken };
