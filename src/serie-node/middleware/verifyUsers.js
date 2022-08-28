const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ err: 'no token provided' });

    const parts = authHeader.split(' ');
    if (!parts.length === 2) return res.status(401).send({ err: 'Token error' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ err: "Token malformatted" });

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).send({ err: "token invalid" });

      req.userId = decoded.id;
      return next();
    });
};