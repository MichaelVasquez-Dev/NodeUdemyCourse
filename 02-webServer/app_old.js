const http = require('http');

const server = http.createServer(( req, res ) => {
    res.write('hola mundo');
    res.end();
});

server.listen(8080, () => {
    console.log('Server on port 8080');
});