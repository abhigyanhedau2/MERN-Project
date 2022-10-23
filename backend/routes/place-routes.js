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

module.exports = router;