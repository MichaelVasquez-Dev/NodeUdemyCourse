require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Static files
app.use(express.static('src/public'));


//HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
hbs.registerPartials(__dirname + '/src/views/partials');


// Routes
app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/generic', (req, res) => {
    res.render('generic')
});

app.get('/elements', (req, res) => {
    res.render('elements')
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/public/html/404.html');
});
  

// Start server
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});