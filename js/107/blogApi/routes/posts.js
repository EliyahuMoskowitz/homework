const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

function auth (req, res, next){
  if(!req.session.user){
    res.statusCode = 401;
    return res.end('sorry! you are not  logged in');
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

router.route('/')
  .get(async (req, res, next) => {
    const skip = +req.query.skip || 0;
    const limit = +req.query.limit || 0;
    const thePosts = await global.posts
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    res.send(thePosts);
  })
  .post(auth, async (req, res, next) => {
    //  res.setHeader('Access-Control-Allow-Credentials', true); //it is in auth
    const post = {
      title: req.body.title,
      body: req.body.body,
      date: new Date(),
      author: req.session.user
    };

    await global.posts.insertOne(post);

    res.status(201).send(post);
    global.socketIo.emit('post', post);
  });

router.post('/:id/comments', auth, async (req, res, next) => {
  // res.setHeader('Access-Control-Allow-Credentials', true); it is in auth
  const newComment = {
    body: req.body.body,
    author: req.session.user,
    date: new Date()
  };

  await global.posts.updateOne(
    { _id: mongo.ObjectId(req.params.id) },
    {
      $push: {
        comments: newComment
      }
    }
  );

  global.socketIo.emit('comment', { postId: req.params.id, comment: newComment });

  res.status(201)
    //.location()
    .send(newComment);
});

module.exports = router;