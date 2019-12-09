const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewDirectory);
hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Guy Chriqui'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Guy Chriqui'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'Help text',
		name: 'Guy Chriqui'
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Guy Chriqui',
		errorMessage: 'Help artical not found'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'You must prevoid an address' });
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must prevoid a serach term' });
	}
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Guy Chriqui',
		errorMessage: 'Page not found'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
