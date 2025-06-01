require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        // Database connection
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true, 
        }));

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(require('../routes/index'));

        this.app.get('/api/api', (req, res) => {
            res.json('GET api!');
        });

        this.app.post('/api/api', (req, res) => {
            res.status(201).json('POST api!');
        });

        this.app.put('/api/api', (req, res) => {
            res.json('PUT api!');
        });

        this.app.patch('/api/api', (req, res) => {
            res.json('PATCH api!');
        });

        this.app.delete('/api/api', (req, res) => {
            res.json('DELETE api!');
        });


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;