'use strict';

const http = require('http');
const fs = require('fs');
// const path = require('path');

// const contentTypes = {
//     html: 'text/html',
//     js: 'text/js',
//     css: 'text/css',
//     jpg: 'image/jpeg'//,
//     //json: 'application/json'
//   };

const args = process.argv.filter((a, i) => i > 1);

http.createServer((req, res) => {

    const file = fs.createReadStream(args[1]);
    // res.statusCode = 200;
    // const ext = path.extname(req.url).substring(1);
    // res.setHeader('content-type', contentTypes[ext]);
    // res.writeHead(200, {'content-type': contentTypes[ext]});
    // file.on('data', data => res.write(data));
    file.on('error', console.error);
    // file.on('end', res.end);

    file.pipe(res);


}).listen(args[0]);