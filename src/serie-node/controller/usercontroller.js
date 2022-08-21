const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
          return res.status(400).send({ error: "email already exists on DB" })

      const user = await User.create(req.body);
      user.password = undefined;

      return res.send({ author });
    } catch (error) {
        res.status(400).send({ error: 'registration failed' });
    }
});


module.exports = app => app.use('/auth', router);