const fs = require('fs');

fs.readdir(process.argv[2], (error, list) => {
    if(!error){
        let correctFiles = list.filter(f => f.endsWith(`.${process.argv[3]}`));
        for (let i = 0; i < correctFiles.length; i++) {
            console.log(correctFiles[i]);
        }
    }
});