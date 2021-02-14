var express = require('express');
var router = express.Router();

let contacts = [
    {id: 1, first:'Donald', last: 'Trump', email: 'dtrump@trump.org', phone: 1425665887},
    {id: 2, first:'Joe', last: 'Biden', email: 'jbiden@b.org', phone: 1425415887},
    {id: 3, first:'Leo', last: 'Chesler', email: 'ch@croll.org', phone: 1421455887},
    {id: 4, first:'Fred', last: 'Tahym', email: 'fred@tr.com', phone: 1426661425} 
  ];

  let ids = contacts.length;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our Contacts!', partials: {content: 'contacts'}, contacts, noContacts: !contacts.length });
});

router.get('/addContact', function(req, res, next) {
    res.render('layout', { title: 'Express Add Contact', partials: {content: 'addContact'} });
});

router.get('/editContact/:id', function(req, res, next) {
  // console.log(req.params.id, contacts.filter(c => c.id===req.params.id)[0]);

  res.render('layout', { title: 'Express Edit Contact', contact: contacts.find(c => c.id === +req.params.id),
       partials: {content: 'editContact'} });
});

router.post('/addContact', function(req, res, next) {
  console.log(req.body);  
  req.body.id = ++ids;
  contacts.push(req.body);
  res.redirect('/contacts');
});

router.get('/deleteContact/:id', function(req, res, next) {
  console.log(req.body);
    contacts = contacts.filter(c => c.id !== +req.params.id);
    res.redirect('/contacts');
});

router.post('/deleteContact', function(req, res, next) {
  console.log(req.body);
    contacts = contacts.filter(c => c.id !== +req.body.delete);
    res.redirect('/contacts');
});

router.post('/editContact/:id', function(req, res, next) {
  console.log(req.body);
  req.body.id = +req.params.id;
    // contacts = contacts.filter(c => c.id !== +req.params.id);
    let update = contacts.findIndex(c => c.id === +req.params.id);
    contacts[update]= req.body;
    // contacts.push(req.body);
    res.redirect('/contacts');
});

module.exports = router;
