// const express = require('express');
// const app = express();
const http = require('http');
// const fs = require('fs/promises');
const fs = require('fs');
const path = require('path');

const contentTypes = {
    html: 'text/html',
    js: 'text/js',
    css: 'text/css',
    jpg: 'image/jpeg',
    json: 'application/json',
    plain: 'text/plain'
  };


http.createServer(/*async*/ (req, res) => {
    console.log(req.url);

    if(req.url === '/'){
        // res.statusCode = 301;
        // res.setHeader('Location', '/index.html');
        res.writeHead(301, {Location: '/index.html'});
        res.end();
    }else{
        // try{
            // const file = /*await*/ fs.readFile(`public/${req.url}`, 'utf-8');
            const file = fs.createReadStream(`public/${req.url}`, 'utf-8');
            // const write = fs.createWriteStream(res);
            const ext = path.extname(req.url).substring(1);
            res.setHeader('content-type', contentTypes[ext || 'html'] || contentTypes['html' /*'plain'*/]);   // `text/${ext}`
            // res.write(file);
            // if(req.method === 'POST'){
            //       app.use(express.json());

            //       app.post('/feedbackform', (req, res) => {
            //           res.writeHead(200, {'content-type': 'text/html'})
            //           const {firstName, lastName, email, dateVisted, dish, page, rating, comments } = req.body;
            //           res.write(`<h1>${firstName}</h1>
            //           <h2>${firstName}</h2><h3>${lastName}</h3><h4>${email}</h4><h5>${dateVisted}</h5><h6>${dish}</h6>
            //                   <div>${page}</div><div>${rating}</div><div>${comments}</div>`);
            //         });
            // }
            file.pipe(res);

            // file.on('data', data => res.write(data));
            // file.on('end', () => {
            //     console.log('read stream ended');
            //     res.end();
            // });
            // file.on('error', console.error('read stream error'));
         
        file.on('error', err => {
            switch (err.code) {
              case 'ENOENT':
                res.statusCode = 404;
                res.setHeader('content-type', 'text/html');
                res.write(`<h1 style="text-align: center; color: teal; font-family: cursive;" >
                             404 Page Not found. Click <a href="./index.html" >here</a> to get to Home Page</h1>`);
                // res.write('No such page. 404');
                break;
              default:
                res.statusCode = 500;
                res.write('Unknown server error');
            }
            res.end();
          });

    }
    // res.end();
}).listen(80);
