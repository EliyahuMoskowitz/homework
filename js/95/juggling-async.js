const http = require('http');

const [node, file, ...rest] = process.argv;
let responses = [];

// (async () => {
//     try{
    rest.forEach((url, index) => http.get(url, respone => {
        respone.setEncoding('utf-8');
        let concatString = '';
        respone.on('data', data => concatString += await data);
        respone.on('end', () => responses[index] = concatString);
    })).on('end')
    // }catch(err){
    //     console.error(err);
    // }

responses.forEach(console.log);
// })();

// console.log(responses);