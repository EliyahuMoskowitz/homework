'use strict';

const mymodule = require('./my-module');

mymodule(process.argv[2], process.argv[3], (error, data) => {
    if(error){
        return console.error('THERE WAS AN ERROR', error);
    }

    // for (let i = 0; i < data.length; i++) {
    //         console.log(data[i]);
    //     }
    data.forEach(e => console.log(e));
});
