const express = require('express');
const placeControllers = require('../controllers/place-controllers');
const router = express.Router();

const { getPlaceById, getPlaceByUserId } = placeControllers;

router.get('/:placeId', getPlaceById);

// Get places belonging to a specific user
router.get('/user/:userId', getPlaceByUserId);

module.exports = router;