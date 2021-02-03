'use strict';

const net = require('net');

    function zeroes(x){
        return (x < 10 ? '0' : '') + x;
    }

net.createServer(socket => {
    const date = new Date();
    let dateString = '';
    dateString += date.getFullYear() + '-'; 
    dateString += zeroes(date.getMonth() + 1) + '-'; // starts at 0
    dateString += zeroes(date.getDate()) + ' '; // returns the day of month
    dateString += zeroes(date.getHours()) + ':';
    dateString += zeroes(date.getMinutes());
    dateString += '\n';

        socket.end(dateString);
        console.log(dateString);
        // setTimeout(() => socket.end(), 5000);

}).listen(process.argv[2]);








