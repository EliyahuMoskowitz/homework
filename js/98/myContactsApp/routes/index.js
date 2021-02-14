var express = require('express');
var router = express.Router();

// let contacts = [
//   {name:'Donald'},
//   {name:'Joe'},
//   {name:'Leo'},
//   {name:'Fred'} 
// ];

let contacts = [
  {id: 1, first:'Donald', last: 'Trump', email: 'dtrump@trump.org', phone: 1425665887},
  {id: 2, first:'Joe', last: 'Biden', email: 'jbiden@b.org', phone: 1425415887},
  {id: 3, first:'Leo', last: 'Chesler', email: 'ch@croll.org', phone: 1421455887},
  {id: 4, first:'Fred', last: 'Tahym', email: 'fred@tr.com', phone: 1426661425} 
  ];

  let ids = contacts.length;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

router.get('/contacts', function(req, res, next) {
  res.render('layout', { title: 'Express' , partials: {content: 'index'}, contacts});
});

router.get('/api/contacts', function(req, res, next) {
  res.send( contacts);
});

router.post('/api/addContact', function({body}, res, next) {  //  {body: {name}}
// res.writeHead(301, {'Location': '/'});
console.log(body, 'in add');
    // if(body.name){
    // contacts.push( {id: ++ids, first: body.first, last: body.last, email: body.email, phone: body.phone} );
    body.id = ++ids;
    contacts.push(body);
    // contacts.push( {name: body.name} );
    console.log('done add', contacts);
    res.redirect('/');
});

router.post('/api/deleteContact', function({body}, res, next) {  
console.log(body, 'in delete');
    // contacts = contacts.filter(c => c.name !== body.delete);
    // contacts = contacts.filter((c, i) => i !== +body.delete);
    contacts = contacts.filter(c => c.id !== +body.delete);
    console.log('done delete', contacts);
    res.redirect('/');
});

router.post('/api/editContact', function({body}, res, next) { 
console.log(body, 'in edit');
  body.id = +body.edit;
  let update = contacts.findIndex(c => c.id === +body.edit);
  contacts[update]= body;
  console.log('done edit', contacts);
  res.redirect('/');
});

module.exports = router;
