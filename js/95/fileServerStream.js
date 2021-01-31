const http = require('http');
// const fs = require('fs/promises');
const fs = require('fs');
const path = require('path');

const contentTypes = {
    html: 'text/html',
    js: 'text/js',
    css: 'text/css',
    jpg: 'image/jpeg'//,
    //json: 'application/json'
  };


http.createServer(/*async*/ (req, res) => {
    console.log(req.url);

    if(req.url === '/'){
        res.statusCode = 301;
        res.setHeader('Location', '/index.html');
    }else{
        // try{
            // const file = /*await*/ fs.readFile(`public/${req.url}`, 'utf-8');
            const file = fs.createReadStream(`public/${req.url}`, 'utf-8');
            // const write = fs.createWriteStream(res);
            const ext = path.extname(req.url).substring(1);
            res.setHeader('content-type', contentTypes[ext]);   // `text/${ext}`
            // res.write(file);

            // file.on('data', data => write.write(data));
            // file.on('end', () => {
            //     console.log('read stream ended');
            //     write.end();
            // });
            // file.on('error', console.error('read stream error'));
            // write.on('error', console.error('write stream error'));

            file.pipe(res);

        // }catch(err){
        //     console.error(err);
        // }

        file.on('error', err => {
            console.log(err);
            if(err.errno === -4058){
                res.statusCode = 404;
                res.setHeader('content-type', 'html');
                res.write('<h1>404 Page Not found. Click <a href="/" >here</a> to get to Home Page</h1>');
            }
        });
    }
    // res.end();
}).listen(80);
