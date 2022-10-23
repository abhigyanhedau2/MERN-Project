const express = require('express');
const placeControllers = require('../controllers/place-controllers');
const router = express.Router();

const { getPlaceById, getPlaceByUserId, createPlace, updatePlaceById, deletePlaceById } = placeControllers;

router.get('/:placeId', getPlaceById);

// Get places belonging to a specific user
router.get('/user/:userId', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:placeId', updatePlaceById);

router.delete('/:placeId', deletePlaceById);

module.exports = router;