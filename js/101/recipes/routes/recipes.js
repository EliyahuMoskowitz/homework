var express = require('express');
const pool = require('../connectionPool');
var router = express.Router();
const debug = require('debug')('recipes:route');


router.route('/:id')
      .get((req, res, next) => { 
        pool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id], (error, results, fields) => {
          if(error){
            return res.sendStatus(500);   //same as res.statusCode = 500; res.end();
          }
          if(!results.length){
            res.status(404)     //not found
            return res.end(`Sorry! There is no recipe ${req.params.id}`);
          }
          res.send(results[0]);        //auto res.status(200)
        });
      })
      .put((req, res, next) => {
        debug(`${JSON.stringify(req.body)} and the ID is: ${req.params.id}`);
        pool.query('UPDATE recipes SET name = ?, category = ?, ingredients = ?, directions = ?, url = ? WHERE id = ?',
             [req.body.name, req.body.category, req.body.ingredients, req.body.directions, req.body.url, req.params.id],
              (error, results, fields) => {
          if(error){
            // return res.end(JSON.stringify(error));     // able to actually see the sql error
            return res.sendStatus(500);   
          }
          if(!results.affectedRows){
            res.status(404);
            return res.end(`Sorry! There is no recipe ${req.params.id}`);
          }
          res.sendStatus(204);  // No content OR maybe 200 success   // same as res.statusCode = 204; res.end()       
        });
      })
      .delete((req, res, next) => {
        pool.query('DELETE FROM recipes WHERE id = ?', [req.params.id], (error, results, fields) => {
          if(error){
            return res.sendStatus(500);   
          }
          if(!results.affectedRows){
            res.status(404);
            return res.end(`Sorry! There is no recipe ${req.params.id}`);
          }
          res.sendStatus(204);        // nothing to return
        });
      });


router.route('/')
      .get((req, res, next) => {
        pool.query('SELECT id, name, category FROM recipes', (error, results, fields) => {
          if(error){
            return res.sendStatus(500);   
          }
          if(!results.length){
            res.status(404);   //not found
            return res.end('Sorry! There are no recipes');
          }
          res.send(results);    // default 200
        })
      })
  .post((req, res, next) => {
    pool.query('INSERT INTO recipes (name, category, ingredients, directions, url) VALUES (?, ?, ?, ?, ?)',
        [req.body.name, req.body.category, req.body.ingredients, req.body.directions, req.body.url], 
        (error, results, fields) => {
      if(error){
        return res.sendStatus(500);   
      }
      req.body.id = results.insertId;
      res.status(201)       // created 
          .location(`${req.baseUrl}/${req.body.id}`)      //same as setHeader('Location': `${req.baseUrl}/${req.body.id}`)
          .send(req.body);      // retrun body with insertId as ID
    })
  });

module.exports = router;
