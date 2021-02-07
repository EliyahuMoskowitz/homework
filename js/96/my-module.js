'use strict';

const fs = require('fs/promises');

module.exports = async (path, ext, callback) => {
    try{
        let dir = await fs.readdir(path);
        return callback(null, dir.filter(f => f.endsWith(`.${ext}`)));
    }catch(error){
        return callback(error);
    }
};

// old fashioned callback way needed to pass learnyounode

const fs = require('fs');
// const extpath = require('path');

module.exports = (path, ext, callback) => {
    // const ext = `.${extpath.extname()}`;

    fs.readdir(path, (error, list) => {
         if(error){
             return callback(error);
         }
        return callback(null, list.filter(f => f.endsWith(`.${ext}`)));
    })
};
