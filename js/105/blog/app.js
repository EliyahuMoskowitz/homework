const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(session({
  secret: 'topSecret',
  cookie: {
    //maxAge: 20000,
    //secure: true
  },
  resave: false,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

let posts, db;
(async () => {
  await client.connect();  
  db = client.db('blogs');
  posts = db.collection('posts');
})().catch(err => console.error(err));

app.locals.title = 'PCS MERN Blog'

app.get('/', async (req, res, next) => {
  if(req.session.login){
  const thePosts = await posts.find().toArray();
  res.render('layout', {
    subtitle: 'Blog Posts',
    links: [{ url: '/addPost', name: 'add post' }],
    thePosts: thePosts,
    // allComments: thePosts.map(p => p.comments),
    // noPosts: !thePosts.comments.length,
    partials: { content: 'posts' }
  });
}else{
  res.render('layout', {
    subtitle: 'Log-In',
    partials: { content: 'login' }
  });
  console.log('falied login');
}
});

app.post('/login', async (req, res, next) => {
  const users = db.collection('users');
  if(req.body.newUser){        //register
  if (!req.body.userName || !req.body.password) {
    // return next(new Error('name and password are required'));
  }

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
  users.insertOne({userName: req.body.userName, password: hash});
  });
}else{        // log-in old user
  let theUser = await users.findOne({userName: req.body.userName}, {password: 1, _id: 0});
  let theUsersPassword = theUser.password;
  bcrypt.compare(req.body.password, theUsersPassword, function (err, result) {
    if (! result) {
      // return next(new Error('Invalid name and password'));
    }else{
  //  result
   req.session.login = req.body.userName;
   return res.end();
    }
  });
}
  res.redirect('/');
});

app.route('/addPost')
  .get((req, res, next) => {
    res.render('layout', {
      subtitle: 'Add Post',
      links: [{ url: '/', name: 'home' }],
      partials: { content: 'addPost' }
    });
  })
  .post(async (req, res, next) => {
    const post = {
      title: req.body.title,
      body: req.body.body,
      date: new Date(),
      author: req.session.login
    };

    await posts.insertOne(post);
    res.redirect('/');
  });

  app.post('/addComment', async (req, res, next) => {
    const comment = {
      title: req.body.subject,
      body: req.body.comment,
      date: new Date(),
      author: req.body.author || req.session.login
    };

    await posts.updateOne({_id: req.body.postId}, {$push: {comments: comment}});
  });

app.listen(80);