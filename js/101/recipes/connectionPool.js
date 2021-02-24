const debug = require('debug')('contacts:pool');
const mysl = require('mysql');

const pool = mysl.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: processs.env.sqlusername,  //'nodeuser' 
    password: processs.env.sqlpassword,   //'test123',
    database: 'nodeuser'
});


pool.on('acquire', function (connection) {
    debug('Connection %d acquired', connection.threadId);
  });
  
  pool.on('connection', function (connection) {
    debug('creating connection');
  });
  
  pool.on('enqueue', function () {
    debug('Waiting for available connection slot');
  });
  
  pool.on('release', function (connection) {
    debug('Connection %d released', connection.threadId);
  });
  
  module.exports  = pool;