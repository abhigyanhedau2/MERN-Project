const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapers in the world',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Eiffel Tower',
        description: 'One of the most famous towers in the world',
        location: {
            lat: 48.8583736,
            lng: 2.2922926
        },
        address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
        creator: 'u1'
    }
];

router.get('/:placeId', (req, res, next) => {

    const placeId = req.params.placeId;

    const place = DUMMY_PLACES.find(place => place.id === placeId);

    res.status(200).json({
        status: 'success',
        data: {
            place: place
        }
    });

});

// Get places belonging to a specific user
router.get('/user/:userId', (req, res, next) => {

    const userId = req.params.userId;

    const userPlaces = DUMMY_PLACES.filter(item => item.creator === userId);

    res.status(200).json({
        status: 'success',
        results: userPlaces.length,
        data: {
            userPlaces: userPlaces
        }
    });

});

module.exports = router;