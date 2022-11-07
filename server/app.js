require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');
const Moods = require('./models/moods.model');
const { errorHandler } = require('./middleware/error.middleware');

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log('process.env = ',  process.env.JWT_SECRET);


// mongoose.connect('mongodb://127.0.0.1:27017/moodsenseapp', { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function () {
// 	console.log("MongoDB database connection established successfully");
// })

// app.get('/', (req, res) => res.send('Hello world!'));

// app.post('/upload-mood', (req, res) => {
// 	try {
// 		const { username, mood, lat, lng } = req.body;
// 		const data = {
// 			username,
// 			mood,
// 			location: {
// 				type: 'Point',
// 				coordinates: [lng, lat]
// 			}
// 		}

// 		new Moods(data)
// 			.save()
// 			.then(item => res.send(item))
// 			.catch(err => res.status(400).send(err))
// 	}
// 	catch (error) {
// 		console.log('error = ', error);
// 		res.status(500);
// 		res.send(error);
// 	}
// });

// app.get('/mood-frequency/:username', (req, res) => {
// 	Moods.find({username: req.params.username})
// 		.then(item => res.send(item))
// 		.catch(err => res.status(400).send(err));
// });

// app.get('/happy-places-nearby', (req, res) => {
// 	const lat = req.query.lat;
// 	const lng = req.query.lng;
// 	if (!lat || !lng) {
// 		res.status(400).send('Latitude and Longitude are Required!!!')
// 	}
// 	Moods.find({
// 		"mood": "Happy",
// 		"location": {
// 			$near: {
// 				$geometry: {
// 					 type: "Point" ,
// 					 coordinates: [ lng , lat ]
// 				},
// 			}
// 		}
//  	})
// 		.then(item => res.send(item))
// 		.catch(err => res.status(400).send(err));
// 	});

app.use('/api', require('./routes/moods.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
