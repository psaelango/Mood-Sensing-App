const express = require('express');
const router = express.Router();
const {
  getMoods,
  getNearByMoodLocations,
  postMoods,
} = require('../controllers/moods.controller');

const { protect } = require('../middleware/auth.middleware')

router.route('/mood-frequency/:username').get(protect, getMoods)
router.route('/nearby-locations/:mood').get(protect, getNearByMoodLocations)
router.route('/upload-mood').post(protect, postMoods)

module.exports = router
