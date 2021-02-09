var express = require('express');
var router = express.Router();

let contacts = [
  {name:'Donald'},
  {name:'Joe'},
  {name:'Leo'},
  {name:'Fred'} 
];

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

router.post('/api/contacts', function(req, res, next) {  //  {body: {name}}
res.writeHead(301, {'Location': '/'});
  if(req.body.name){
    contacts.push( {name: req.body.name} );
  }else if(req.body.delete){
    contacts = contacts.filter(c => c.name !== req.body.delete);
  }else{
    res.write('Must include "name or delete"');
  }
  res.end();
});

module.exports = router;
