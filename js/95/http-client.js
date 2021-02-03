const http = require('http');

http.get(process.argv[2], respone => {
    respone.setEncoding('utf-8');
    respone.on('data', console.log);    //data => console.log(data));
    respone.on('error', console.error);
    // respone.on('end', () => console.log('Stream is Over'));
}).on('error', console.error);