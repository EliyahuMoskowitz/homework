var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const viewCart = require('./viewCart');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'topSecret',
  cookie: {
    //maxAge: 20000,
    //secure: true
  },
  resave: false,
  saveUninitialized: false
}));

app.use('/cart', viewCart);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.items = [
  {
    id: 1,
    name: 'mouse',
    description: 'wireless 3 button mouse',
    price: '9.99',
    img: 'https://cdn.shopify.com/s/files/1/0121/0014/1114/products/0029358_w571-wireless-optical-mouse.png?v=1606277993'
  },
  {
    id: 2,
    name: 'monitor',
    description: 'LCD 27 Inch Monitor',
    price: '199.99',
    img: 'https://store.hp.com/app/assets/images/product/4TB31AA%23ABA/right_facing.png?_=1571664880964'
  },
  {
    id: 3,
    name: 'speaker',
    description: 'great audio speaker',
    price: '129.99',
    img: 'https://images.crateandbarrel.com/is/image/Crate/MiniWntHalo1BthSpkrSSF20_VND/$web_pdp_main_carousel_med$/200616152324/mini-halo-one-bluetooth-speaker.jpg'
  }
];

module.exports = app;
