const http = require('http');

http.get(process.argv[2], respone => {
    respone.setEncoding('utf-8');
    respone.on('data', data => console.log(data));
    respone.on('error', err => console.error(err));
    // respone.on('end', () => console.log('Stream is Over'));
}).on('error', err => console.error(err));