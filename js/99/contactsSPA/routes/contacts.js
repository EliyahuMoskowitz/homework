var express = require('express');
var router = express.Router();


let contacts = [
  {id: 1, first:'Donald', last: 'Trump', email: 'dtrump@trump.org', phone: 1425665887},
  {id: 2, first:'Joe', last: 'Biden', email: 'jbiden@b.org', phone: 1425415887},
  {id: 3, first:'Leo', last: 'Chesler', email: 'ch@croll.org', phone: 1421455887},
  {id: 4, first:'Fred', last: 'Tahym', email: 'fred@tr.com', phone: 1426661425} 
  ];

  let ids = contacts.length;


router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our Contacts!' , partials: {content: 'contacts'}, contacts});
});

router.get('/api', function(req, res, next) {
  res.send( contacts);
});

router.post('/addContact', function({body}, res, next) { 
console.log(body, 'in add');

    body.id = ++ids;
    contacts.push(body);

    console.log('done add', contacts);
    res.redirect('/contacts');
});

router.post('/deleteContact', function({body}, res, next) {  
console.log(body, 'in delete');
    
    contacts = contacts.filter(c => c.id !== +body.delete);

    console.log('done delete', contacts);
    res.redirect('/contacts');
    // res.end();
});

router.post('/editContact', function({body}, res, next) { 
console.log(body, 'in edit');

  body.id = +body.edit;
  contacts[contacts.findIndex(c => c.id === +body.edit)] = body;

  console.log('done edit', contacts);
  res.redirect('/contacts');
});

module.exports = router;
