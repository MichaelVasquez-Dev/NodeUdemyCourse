const http = require('http');
const express = require('express');
const cors = require('cors');
const Socket = require('socket.io');
const { socketController } = require('../sockets/socket.controller');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3000;
        this.portSocket = process.env.PORT_SOCKET || 3001;
        // this.server = http.createServer(this.app);
        this.server = require('http').createServer(this.app);
        this.io = Socket( this.server );

        this.paths = {

        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('src/public') );
    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets(){
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server online in: http://localhost:' + this.port);
        });
        this.server.listen( this.portSocket, () => {
            console.log('Socket server listening on port ' + this.portSocket);
        });
    }

}


module.exports = Server;