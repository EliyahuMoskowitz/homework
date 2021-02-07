'use strict';

const http = require('http');
const path = require('path');

const contentTypes = {
    html: 'text/html',
    js: 'text/js',
    css: 'text/css',
    jpg: 'image/jpeg',
    json: 'application/json'
  };

http.createServer((req, res) => {
    console.log(req.url);
    let theUrl =  new URL(req.url, 'http://localhost');     console.log(theUrl);
    let iso = new Date(theUrl.searchParams.get('iso'));//.getTime();//        console.log(iso);
    // let iso = new Date(theUrl.search.substring(1).split('=')[1]);
    const ext = path.extname(req.url).substring(1);
    res.writeHead(200, { 'content-type': contentTypes[ext] || 'text/plain' });
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // console.log(theUrl.pathname);
    // if(theUrl.indexOf( '/api/parsetime') > - 1){
    if(theUrl.pathname === '/api/parsetime'){
        res.write(JSON.stringify({
        "hour": iso.getHours(),
        "minute": iso.getMinutes(),
        "second": iso.getSeconds()
        }))

    // }else if(theUrl.indexOf( '/api/unixtime') > - 1){
    }else if(theUrl.pathname === '/api/unixtime'){
        res.write(JSON.stringify({ "unixtime": iso.getTime()}));
    }else{
        res.write('Sorry, you must enter a valid api type and ISO date value');
    }

    res.end();
}).listen(+process.argv[2]);
