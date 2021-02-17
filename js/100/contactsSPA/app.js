var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('mycontactsapp:app');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

var app = express();

const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'test123',
  database: 'nodeuser'
});

mysqlConnection.connect();
// mysqlConnection.end();
//WRONG - TEMPORARY
global.db = mysqlConnection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.render('layout', {title: 'Sorry Error', partials: {content: 'error'}});
});

app.locals.theTitle = 'This is Our App';

module.exports = app;
