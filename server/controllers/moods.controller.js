const asyncHandler = require('express-async-handler');

const Moods = require('../models/moods.model');

// @desc    Get moods for given user
// @route   GET /api/mood-frequency/:username
// @access  Private
const getMoods = asyncHandler(async (req, res) => {
  console.log('req = ', req.user);
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  
	Moods.find({username: req.params.username})
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
	console.log('req.user = ', req.user)
  
	const lat = Number(req.query.lat);
	const lng = Number(req.query.lng);

	if (!lat || !lng) {
		res.status(400);
		res.send('Latitude and Longitude are Required!!!');
		return;
	}
	console.log('gettingNearByMoodLocations');
	// Moods.find({
	// 	"location": {
	// 		$near: {
	// 			$geometry: {
	// 				type: "Point" ,
	// 				coordinates: [ lng , lat ]
	// 			},
	// 			$maxDistance: 1000000,
	// 		}
	// 	}
 	// })
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
		"username": "123",
		"mood": "Happy",
 	})
	// Moods.aggregate([
	// 	{
	// 		$geoNear: {
	// 			 near: { type: "Point", coordinates: [ lng , lat ] },
	// 			 distanceField: "dist.calculated",
	// 			 maxDistance: 1000000,
	// 			 minDistance: 1,
	// 			 query: { mood: "Happy", username: req.user.name },
	// 			 includeLocs: "dist.location",
	// 			 spherical: true
	// 		}
	// 	}
 	// ])
	.then(item => {
		console.log('item = ', item);
		res.send(item);
	})
	.catch(err => {
		console.log('err = ', err);
		res.status(400).json(err)
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
		const { username, mood, lat, lng } = req.body;
		const data = {
			username,
			mood,
			location: {
				type: 'Point',
				coordinates: [lng, lat]
			}
		}

		new Moods(data)
			.save()
			.then(item => res.send(item))
			.catch(err => res.status(400).json(err))
	}
	catch (error) {
		console.log('error = ', error);
		res.status(500);
		res.send(error);
	}
})

module.exports = {
  getMoods,
  getNearByMoodLocations,
  postMoods,
}