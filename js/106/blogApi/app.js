const express = require('express');
// const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const socketIo = require("socket.io")(server);

// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongo = require('mongodb');
const client = new mongo.MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

let posts;
(async () => {
  await client.connect();
  const db = client.db('blogs');
  posts = db.collection('posts');
})().catch(err => console.error(err));

app.get('/', async (req, res, next) => {
  console.log('in get');
  //const skip = +req.query.skip || 0;
  //const limit = +req.query.limit || 0;
  const thePosts = await posts
    .find()
    //.skip(skip)
    //.limit(limit)
    .toArray();

  res.send(thePosts);
});

app.route('/addPost')
  .post(async (req, res, next) => {
    const post = {
      title: req.body.title,
      body: req.body.body,
      date: new Date(),
      author: 'you'//req.user
    };

    await posts.insertOne(post);

    res.status(201).send(post);
    //socketIo.emit('post');
  });

app.post('/addComment/:id', async (req, res, next) => {
  const newComment = {
    body: req.body.body,
    author: 'me', //req.user,
    date: new Date()
  };

  await posts.updateOne(
    { _id: mongo.ObjectId(req.params.id) },
    {
      $push: {
        comments: newComment
      }
    }
  );

  //socketIo.emit('comment', newComment);

  res.status(201)
    //.location()
    .send(newComment);
});

app.use((req, res, next) => {
  const error = new Error('No such API method');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).send(error.message);
});

server.listen(80);