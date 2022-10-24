const HttpError = require('../utils/http-error');
const validator = require('express-validator');
const getCoordsForAddress = require('../utils/location');
const uuid = require('uuid').v4;

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {

    const placeId = req.params.placeId;

    const place = DUMMY_PLACES.find(place => place.id === placeId);

    if (!place)
        return next(new HttpError(404, 'Could not find a place for the provided id'));

    res.status(200).json({
        status: 'success',
        data: {
            place: place
        }
    });

};

const getPlacesByUserId = (req, res, next) => {

    const userId = req.params.userId;

    const userPlaces = DUMMY_PLACES.filter(item => item.creator === userId);

    if (!userPlaces || userPlaces.length === 0)
        return next(new HttpError(404, 'Could not find a place for the provided user id'));

    res.status(200).json({
        status: 'success',
        results: userPlaces.length,
        data: {
            userPlaces: userPlaces
        }
    });

};

const createPlace = async (req, res, next) => {

    // Check if there are any validation errors from the array of 
    // validators we provided in the routes
    const errors = validator.validationResult(req);

    if (!errors.isEmpty())
        return next(new HttpError(422, 'Invalid inputs.'));

    const { title, description, address, creator } = req.body;

    let coordinates;

    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({
        status: 'success',
        data: {
            place: createdPlace
        }
    });

};

const updatePlaceById = (req, res, next) => {

    // Check if there are any validation errors from the array of 
    // validators we provided in the routes
    const errors = validator.validationResult(req);

    if (!errors.isEmpty())
        return next(new HttpError(422, 'Invalid inputs.'));

    const placeId = req.params.placeId;
    const { title, description } = req.body;

    // Creating the copy of the found place, so that we won't change the actual object
    const toBeUpdatedPlace = { ...DUMMY_PLACES.find(item => item.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(item => item.id === placeId);

    if (!toBeUpdatedPlace)
        return next(new HttpError(404, 'Could not find a place for the provided id'));

    toBeUpdatedPlace.title = title;
    toBeUpdatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = toBeUpdatedPlace;

    res.status(200).json({
        status: 'success',
        data: {
            place: toBeUpdatedPlace
        }
    });

};

const deletePlaceById = (req, res, next) => {

    const placeId = req.params.placeId;

    if (!DUMMY_PLACES.find(place => place.id === placeId))
        return next(404, 'Place Not Found');

    DUMMY_PLACES = DUMMY_PLACES.filter(item => item.id !== placeId);

    res.status(204).json({
        status: 'success',
        data: {
            place: null
        }
    });

};

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };