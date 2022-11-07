const mongoose = require('mongoose');

const pointCoordinateSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const Moods = new mongoose.Schema({
  userName: {
    type: String,
    required : true,
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Neutral'],
    required : true,
  },
  locationName: {
    type: String,
  },
  location: {
    type: pointCoordinateSchema,
    required : true,
  }
});

Moods.index({ "location" : "2dsphere" });

module.exports = mongoose.model('Moods', Moods);
