var express = require('express');
var router = express.Router();
var debug = require('debug')('mycontactsapp:route');


router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our Contacts!' , partials: {content: 'contacts'}});
});

router.get('/api', function(req, res, next) {
  db.query('SELECT * FROM contacts', (error, results, fields) => {
    if(error){
      res.statusCode = 404;
    }
    res.statusCode = 201;
    res.send( results);
  });
});

// in AJAX we are using PUT
router.post('/addContact', function({body}, res, next) { 
  debug(JSON.stringify(body));

  db.query('INSERT INTO contacts (first, last, email, phone) VALUES (?,?,?,?)', 
        [body.first, body.last, body.email, body.phone],
        (error, results, fields) => {
          if(error){
            res.statusCode = 404;
          }
        
        res.statusCode = 201;
        res.send(JSON.stringify(results.insertId));   // couldn't send number, thought was a status code in deprecated function
        // res.send(results.insertId); 
        // res.redirect('/contacts');
        debug(JSON.stringify(results));
            });
});
// in AJAX we are using PUT
router.put('/addContact', function({body}, res, next) { 
  debug(JSON.stringify(body));

  db.query('INSERT INTO contacts (first, last, email, phone) VALUES (?,?,?,?)', 
        [body.first, body.last, body.email, body.phone],
        (error, results, fields) => {
          if(error){
            res.statusCode = 404;
          }
        
        res.statusCode = 201;
        res.send(JSON.stringify(results.insertId));   // couldn't send number, thought was a status code in deprecated function
        // res.redirect('/contacts');
        debug(JSON.stringify(results));
            });
});

// in AJAX we are using DELETE
router.post('/deleteContact', function({body}, res, next) {  
  // console.log(body, 'in delete');
  debug(JSON.stringify(body, 'in delete'));
    global.db.query('DELETE FROM contacts WHERE id = ?', [+body.delete],  (error, results, fields) => {
      if(error){
        res.statusCode = 404;
      }
      if(!results.affectedRows){
        res.statusCode = 404;
       return res.send(`Could not delete contact ${body.delete}, sorry! `);
      }
      res.statusCode = 201;
      res.end();    // very important!
      debug(JSON.stringify(body, 'done delete'));
        });
});

// in AJAX we are using DELETE
router.delete('/deleteContact', function({body}, res, next) {  
  // console.log(body, 'in delete');
  debug(JSON.stringify(body, 'in delete'));
  global.db.query('DELETE FROM contacts WHERE id = ?', [+body.delete],  (error, results, fields) => {
    if(error){
      res.statusCode = 404;
    }
    if(!results.affectedRows){
      res.statusCode = 404;
      return res.send(`Could not delete contact ${body.delete}, sorry! `);
    }

    res.statusCode = 201;
    res.end();        // very important!
    debug(JSON.stringify(body, 'done delete'));
      });
});

router.post('/editContact', function({body}, res, next) { 
  debug(JSON.stringify(body, 'in edit'));

  db.query('UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?', 
      [body.first, body.last, body.email, body.phone, +body.edit],
        (error, results, fields) => {
          if(error){
            res.statusCode = 404;
            debug(JSON.stringify('sql error'));
          }
          if(!results.affectedRows){
            res.statusCode = 404;
            debug(JSON.stringify('affected rows error'));
            return res.send(`Could not edit ${body.edit}, sorry! `);
          }
          debug(JSON.stringify(body, 'done edit'));
        res.statusCode = 201;
        res.end();      // very important!
        // res.redirect('/contacts');
        // debug(JSON.stringify(body, 'done edit'));
    });
});

module.exports = router;
