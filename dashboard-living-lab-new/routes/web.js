const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('maps.hbs', {
		maps: true
	});
});

router.get('/airsensor', (req, res) => {
	res.render('airsensor.hbs', {
		airsensor: true
	});
});

router.get('/parking', (req, res) => {
	res.render('parking.hbs', {
		parking: true
	});
});

router.get('/waste', (req, res) => {
	res.render('waste.hbs', {
		waste: true
	});
});

router.get('/vehicle', (req, res) => {
	res.render('vehicle.hbs', {
		vehicle: true
	});
});

router.get('/maps', (req, res) => {
	res.render('maps.hbs', {
		maps: true
	});
});

module.exports = router;