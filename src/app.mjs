// Node Core Modules
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// NPM modules
import express from 'express';
import hbs from 'hbs';

// Local modules
import { geocode } from './utils/geocode.mjs';
import { forecast } from './utils/forecast.mjs';

const app = express();

// Setting up path to the 'public' folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, '../public')));

// Setting up 'views' folder
const viewsPath = join(__dirname, '../templates/views');
app.set('views', viewsPath);

//Setting up 'partials' folder
const partialsPath = join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Setting templating engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        credit: "Sam"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Welcome to the Help page',
        credit: "Sam"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'Welcome to the About page',
        credit: "Sam"
    });
});

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: "No query provided!"
        });
    }
    
    console.log(req.query.address);

    geocode(req.query.address, (error, address) => {
        if (error) {
            console.log(error);
            return res.send({error});
        }
    
        const { Latitude: latitude, Longitude: longitude, Location: location } = address;

        forecast(latitude, longitude, (error, weather) => {
            if (error) {
                console.log(error);
                return res.send({error});
            }
    
            console.log('Location: ', location);
            
            if (weather != undefined) {
                console.log('Weather: ', weather);
                res.send({
                    location,
                    forecast: weather
                });
            }
        });
    }); 
});

// catch 404
app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Error rendering the Help page!',
        help: 'Page you\'re trying to reach cannot be found..',
        credit: "Sam"
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        errMsg: '404 Not Found!',
        credit: "Sam"
    });
});

// Initiating the server
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});