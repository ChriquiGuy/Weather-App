const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/381f48b76d469bdd7f3f82a55f332514/' +
		encodeURIComponent(latitude) +
		',' +
		encodeURIComponent(longitude) +
		'?units=si';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect weather servise', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					' Its currently ' +
					body.currently.temperature +
					' degrees out. There is a ' +
					body.currently.precipProbability +
					'% chance of rain.'
			);
		}
	});
};

module.exports = forecast;
