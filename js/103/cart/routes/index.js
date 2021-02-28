var express = require('express');
const Cart = require('../cart');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('layout', { title: 'Express', partials: { content: 'index' }, items: global.items });
  })
  .post((req, res, next) => {
    // const cart = req.session.cart || new Cart();
    // Object.setPrototypeOf(cart, Cart);


    //3 - req.session.cart for some reason isnt a Cart its just an object. Has items but not Cart prototype... recreate Cart, passing in old items
    const cart = new Cart(req.session.cart ? req.session.cart.items : {});

    console.log('before add', cart);
    cart.addItem(req.body.id, +req.body.count);
    console.log('after add', cart);

    req.session.cart = cart;
    req.session.foo = 5;

    // 1 - added - we never ended the request so session cookie wasnt sent back
    res.redirect('/');
  })
  .put((req, res, next) => {
    console.log(req.body);
    const cart = new Cart(req.session.cart ? req.session.cart.items : {});

    switch(req.body.id){
          case 'addOne':
            cart.addItem(req.body.id, +req.body.amount);
            break;
          case 'removeOne':
            cart.removeItem(req.body.id, +req.body.amount);
            break;
          case 'removeAll':
            cart.removeItem(req.body.id, 'all');
      }


    req.session.cart = cart;
    // 1 - added - we never ended the request so session cookie wasnt sent back
    res.end();
  });




  // router.route('/cart')
  //       .get((req, res, next) => {

  //       });

module.exports = router;
