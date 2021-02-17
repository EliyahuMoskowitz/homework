var debug = require('debug')('contacts:route');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.query('SELECT * FROM contacts', (error, results, fields) => {
    if(error){
      return next(new Error(`Could not access, sorry! ${error.message}`));
    }

    res.render('layout', { title: 'Our Contacts!', partials: {content: 'contacts'}, contacts: results, noContacts: !results.length });

  });
});

router.get('/addContact', function(req, res, next) {
    res.render('layout', { title: 'Express Add Contact', btnTxt: 'Add', partials: {content: 'addEditContact'} });
});

router.get('/editContact/:id', function(req, res, next) {
  global.db.query('SELECT * FROM contacts WHERE id = ?', [+req.params.id], 
      (error, results, fields) => {
        if(error){
          return next(new Error(`Could not access, sorry! ${error.message}`));
        }
          if(!results.length){
            return next(new Error(`Could not access, sorry! ${req.params.id}`));
          }
  res.render('layout', { title: 'Express Edit Contact', contact: results[0],
      btnTxt: 'Save', partials: {content: 'addEditContact'}});
  });
});

router.post('/addContact', function(req, res, next) {
  debug(JSON.stringify(req.body));
  
  db.query('INSERT INTO contacts (first, last, email, phone) VALUES (?,?,?,?)', 
        [req.body.first, req.body.last, req.body.email, req.body.phone],
        (error, results, fields) => {
          if(error){
            return next(new Error(`Could not add contact, sorry! ${error.message}`));
          }
        res.redirect('/contacts');
            });
});

router.get('/deleteContact/:id', function(req, res, next) {
  // console.log(req.body);
  debug(JSON.stringify(req.body));
    // contacts = contacts.filter(c => c.id !== +req.params.id);
    db.query('DELETE FROM contacts WHERE id = ?', [+req.params.id], (error, results, fields) => {
      if(error){
        return next(new Error(`Could not delete ${req.params.id}, sorry! ${error.message}`));
      }
      if(!results.affectedRows){
        return next(new Error(`Could not delete ${req.params.id}, sorry! `));
      }
    res.redirect('/contacts');
        });
});

// either get as anchor or post in form
router.post('/deleteContact', function(req, res, next) {
  // console.log(req.body);
  debug(JSON.stringify(req.body));
    // contacts = contacts.filter(c => c.id !== +req.body.delete);
    global.db.query('DELETE FROM contacts WHERE id = ?', [+req.body.delete],  (error, results, fields) => {
      if(error){
        return next(new Error(`Could not delete ${req.body.delete}, sorry! ${error.message}`));
      }
      if(!results.affectedRows){
        return next(new Error(`Could not delete ${req.body.delete}, sorry! `));
      }
    res.redirect('/contacts');
        });
});

router.post('/editContact/:id', function(req, res, next) {
  // console.log(req.body);
  debug(JSON.stringify(req.body));

    db.query('UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?', 
        [req.body.first, req.body.last, req.body.email, req.body.phone, +req.params.id],
          (error, results, fields) => {
            if(error){
              return next(new Error(`Could not edit ${req.params.id}, sorry! ${error.message}`));
            }
            if(!results.affectedRows){
              return next(new Error(`Could not edit ${req.params.id}, sorry!`));
            }
          res.redirect('/contacts');
              });
});

module.exports = router;
