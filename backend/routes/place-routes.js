const express = require('express');
const placeControllers = require('../controllers/place-controllers');
const validator = require('express-validator');
const router = express.Router();

const { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById } = placeControllers;

const validationArr = [
    validator.check('title').not().isEmpty(),
    validator.check('description').isLength({ min: 5 }),
    validator.check('address').not().isEmpty()
];

router.get('/:placeId', getPlaceById);

// Get places belonging to a specific user
router.get('/user/:userId', getPlacesByUserId);

router.post('/', validationArr, createPlace);

// Only check for title and description
router.patch('/:placeId', [validationArr[0], validationArr[1]], updatePlaceById);

router.delete('/:placeId', deletePlaceById);

module.exports = router;