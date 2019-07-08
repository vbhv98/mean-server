const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return res.status(400).send('user not found!');
    if (user.password === password) return res.status(200).send('loggedin');
  });
});

module.exports = router;
