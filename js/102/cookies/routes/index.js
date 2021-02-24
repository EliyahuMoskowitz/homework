var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
      .get(function(req, res, next) {
        res.locals.nameAuth = req.cookies['saveName'] ? JSON.parse(req.cookies['saveName']).name : null;
  res.render('index', { title: 'Express', partials: {content: !res.locals.nameAuth ? 'nameAuth' : 'passedTest'} });
})    
      .post((req, res, next) => {     //saveName
          // res.status(201).location('');
          res.cookie('saveName', JSON.stringify({name: req.body.name}));
          res.redirect('/');
          // res.end();
});

module.exports = router;
