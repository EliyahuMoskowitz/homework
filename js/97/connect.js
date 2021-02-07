const app = require('connect')();

console.log('working');

app.use((req, res, next) => {
    console.log('working inside');
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.setHeader('content-type', 'text/html');
    res.write('<h1>Welcome to ourSite!<?h1>');
    // if(new URL(req.url, 'http://localhost').searchParams.get('magicword') === 'please'){
    //     next();
    // }else{
    //     console.log('ERROR oh boy1');
    //     next(error);
    // }
    next();
});

app.use('/home', (req, res, next) => {
    res.write('<h1>Welcome to home ourSite!<?h1>');
    next();
});

app.use(require('./error'));

app.use('/about', (req, res, next) => {
    res.write('<h1>Welcome to about ourSite!<?h1>');
    next();
});

app.use('/nfl', (req, res, next) => {
    res.write('<h1>Welcome to nfl ourSite!<?h1>');
    next();
});


app.use((error, req, res, next) => {
    console.log('ERROR oh boy2');
    // res.writeHead(200, {'content-type': 'text/html'});
    res.write('<div>SORRY! YOU DID NOT ASK PROPERLY! <h1>&copy; USA</h1></div>');
    next();
});

app.use((req, res, next) => {
    console.log('down below');
    // res.writeHead(200, {'content-type': 'text/html'});
    res.end('<div><h1>&copy; USA from down below</h1></div>');
});

app.listen(86);