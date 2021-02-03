'use strict';

const fs = require('fs');

module.exports = (path, ext, callback) => {

    fs.readdir(path, (error, list) => {
         if(error){
             return callback(error);
         }
        return callback(null, list.filter(f => f.endsWith(`.${ext}`)));
    })
};
