const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
  if (!req.body.name || !req.body.password) {
    res.status(401)
      // .send('name and password are required');
    return next(new Error('name and password are required'));
  }
  let exists = await global.users.find({userName: req.body.name});
  if (exists) {
    res.status(401)
        // .send('User Name is already in use. Please use another');
    return next(new Error());
  }

  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (err) {
      res.statusCode = 418;
      // res.send(err);
      return next(err);
    }

      await global.users.insertOne({userName: req.body.name, password: hash});
      req.session.user = req.body.name;         // i decided to log him in at time of registration
      res.sendStatus(201);
      console.log(`${req.body.name} registered`);
  });
});

router.post('/login', async (req, res, next) => {
  let awaitPassword = await global.users.findOne({userName: req.body.name}, {password: 1, _id: 0});
  let cryptedPassword = awaitPassword.password;
      if (!cryptedPassword) {
        res.status(401);
        return next(new Error('Invalid name and password 1'));
      }

      bcrypt.compare(req.body.password, cryptedPassword, function (err, result) {
        if (!result) {
          res.status(401);
          return next(new Error('Invalid name and password 2'));
        }
        req.session.user = req.body.name;
        // res.sendStatus(200);
        res.send(`${req.body.name} logged in`);
        console.log(`${req.body.name} logged in`);
      });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  // res.sendStatus(200);
  res.end(`${req.body.name} logged out`);
  console.log(`${req.body.name} logged out`);
});

module.exports = router;
