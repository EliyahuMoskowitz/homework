'use strict';

const http = require('http');
const fs = require('fs');
// const path = require('path');
const map = require('through2-map');

// const contentTypes = {
//     html: 'text/html',
//     js: 'text/js',
//     css: 'text/css',
//     jpg: 'image/jpeg'//,
//     //json: 'application/json'
//   };


http.createServer((req, res) => {

    if(req.method === 'POST'){
        // const file = fs.createReadStream(req.param);

        req.pipe(map(chunk =>  {
            return chunk.toString().toUpperCase();
          })).pipe(res);

    }else {
        // console.log('GET');
        // let html = `
        //         <html>
        //             <body>
        //                 <form method="post" action="http://localhost:${process.argv[2]}">Name: 
        //                     <input type="text" name="name" />
        //                     <input type="submit" value="Submit" />
        //                 </form>
        //             </body>
        //         </html>`
        // response.writeHead(200, {'Content-Type': 'text/html'})
        return response.end('Send me a post');      // html
    }
    
    // res.statusCode = 200;
    // const ext = path.extname(req.url).substring(1);
    // res.setHeader('content-type', contentTypes[ext]);
    // res.writeHead(200, {'content-type': contentTypes[ext]});
    // file.on('data', data => res.write(data));
    // file.on('error', console.error);
    // file.on('end', res.end);

    // file.pipe(res);


}).listen(process.argv[2]);



// const http = require('http')

// const server = http.createServer(function(request, response) {
//   console.dir(request.param)

//   if (request.method == 'POST') {
//     console.log('POST')
//     var body = ''
//     request.on('data', function(data) {
//       body += data
//       console.log('Partial body: ' + body)
//     })
//     request.on('end', function() {
//       console.log('Body: ' + body)
//       response.writeHead(200, {'Content-Type': 'text/html'})
//       response.end('post received')
//     })
//   } 