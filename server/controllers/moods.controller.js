const asyncHandler = require('express-async-handler');
const logger = require('../logger');
const Moods = require('../models/moods.model');

// @desc    Get moods for given user
// @route   GET /api/mood-frequency/:userName
// @access  Private
const getMoods = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  
	Moods.find({userName: req.params.userName})
		.then(item => res.send(item))
		.catch(err => res.status(400).json(err));
})

// @desc    Get nearby locations for given mood
// @route   GET /api/nearby-locations/:mood
// @access  Private
const getNearByMoodLocations = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  
	const lat = Number(req.query.lat);
	const lng = Number(req.query.lng);

	if (!lat || !lng) {
		res.status(400);
		res.send('Latitude and Longitude are Required!!!');
		return;
	}

	Moods.find({
		"location": {
			$near: {
				$geometry: {
					type: "Point" ,
					coordinates: [ lng , lat ]
				},
				$maxDistance: 1000000,
			}
		},
		"userName": req.user.name,
		"mood": req.params.mood,
 	})
	.then(item => res.send(item))
	.catch(error => {
		logger.log('error', 'Moods Controller getNearByMoodLocations error: ', new Error(error));
		res.status(400).json(error)
	});
});

// @desc    Insert moods
// @route   POST /api/upload-mood
// @access  Private
const postMoods = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  try {
		const { userName, mood, lat, lng, locationName } = req.body;
		const data = {
			userName,
			mood,
			locationName,
			location: {
				type: 'Point',
				coordinates: [lng, lat]
			}
		}

		new Moods(data)
			.save()
			.then(item => res.send(item))
			.catch(error => {
				logger.log('error', 'Moods Controller postMoods error: ', new Error(error));
				res.status(400).json(error)
			});
	}
	catch (error) {
		logger.log('error', 'Moods Controller postMoods error: ', new Error(error));
		res.status(500).send(error);
	}
})

module.exports = {
  getMoods,
  getNearByMoodLocations,
  postMoods,
}