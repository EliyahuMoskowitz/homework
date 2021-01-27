const fs = require('fs');

// let buffer = fs.readFileSync(process.argv[2]);
// let arrNewLines = buffer.toString().split('\n');
// console.log(arrNewLines.length - 1);

// console.log(fs.readFileSync(process.argv[2]).toString().split('\n').length - 1);

console.log(fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1);


