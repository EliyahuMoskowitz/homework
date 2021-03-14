const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session')

app.use(session({
  secret: 'topSecret',
  cookie: {
    //maxAge: 20000,
    //secure: true
  },
  resave: false,
  saveUninitialized: false
}));

/*const*/ global.socketIo = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    //methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongo = require('mongodb');
//mongodb+srv://EliyahuUser:<password>@cluster0.8f4nt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const client = new mongo.MongoClient('//mongodb://localhost:27017', { useUnifiedTopology: true });

//let posts;
(async () => {
  await client.connect();
  const db = client.db('blogs');
  global.posts = db.collection('posts');
  global.users = db.collection('users');
})().catch(err => console.error(err));

app.use(require('cors')({
  origin: 'http://localhost:3000',
  credentials: true
}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//     return res.end();
//   }
//   next();
// });

// app.options('/*', (req, res, next) => {
//   return res.end();
// });

app.use('/', require('./routes/authentication'));
app.use('/posts', require('./routes/posts'));

app.use((req, res, next) => {
  const error = new Error('No such API method');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).send(error.message);
});

server.listen(80);