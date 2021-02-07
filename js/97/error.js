const app = require('connect')();

module.exports = (req, res, next) => {
    if(new URL(req.url, 'http://localhost').searchParams.get('magicword') === 'please'){
        next();
    }else{
        console.log('ERROR oh boy1');
        next(error);
    }
};