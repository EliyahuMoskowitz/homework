const http = require('http');

let concatString = ''; 

http.get(process.argv[2], respone => {
    respone.setEncoding('utf-8');
    respone.on('data', data => concatString += data);
    respone.on('error', err => console.error(err));
    respone.on('end', () => {console.log(concatString.length); console.log(concatString)});
}).on('error', err => console.error(err));

// const http = require('http');
// const bl = require('bl');

// http.get(process.argv[2], respone => {
//     respone.pipe(bl((err, data) => {
//         if(err){
//             return console.error(err);
//         }
//         data = data.toString();
//         console.log(data.length);
//         console.log(data);
//     }));
// }).on('error', err => console.error(err));

// const http = require('http');
// const concatStream = require('concat-stream');

// http.get(process.argv[2], respone => {
//     respone.pipe(concatStream((data) => {
//         data = data.toString();
//         console.log(data.length);
//         console.log(data);
//     }));
// }).on('error', err => console.error(err));