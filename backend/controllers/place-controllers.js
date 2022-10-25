const HttpError = require('../utils/http-error');
const validator = require('express-validator');
const uuid = require('uuid').v4;
const mongoose = require('mongoose');

const Place = require('../models/place');
const User = require('../models/user');
const getCoordsForAddress = require('../utils/location');

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

const getPlaceById = async (req, res, next) => {

    const placeId = req.params.placeId;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (error) {
        return next(new HttpError(500, 'Place creation failed'));
    }

    if (!place)
        return next(new HttpError(404, 'Could not find a place for the provided id'));

    res.status(200).json({
        status: 'success',
        data: {
            place: place.toObject({ getters: true })
        }
    });

};

const getPlacesByUserId = async (req, res, next) => {

    const userId = req.params.userId;

    let userPlaces;

    try {
        userPlaces = await Place.find({ creator: userId });
    } catch (error) {
        return next(new HttpError(500, 'Places retrieval failed'));
    }

    if (!userPlaces || userPlaces.length === 0)
        return next(new HttpError(404, 'Could not find a place for the provided user id'));

    res.status(200).json({
        status: 'success',
        results: userPlaces.length,
        data: {
            userPlaces: userPlaces.map(place => place.toObject({ getters: true }))
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

    const createdPlace = new Place({
        title,
        description,
        location: coordinates,
        image: 'https://media.timeout.com/images/101705309/image.jpg',
        address,
        creator
    });

    // Check if user id exists
    let user;

    try {
        user = await User.findById(creator);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place creation failed'));
    }

    if (!user)
        return next(new HttpError(404, 'No user found'));

    try {

        // Starting a session
        const sess = await mongoose.startSession();

        // Place is saved
        sess.startTransaction();
        await createdPlace.save({ session: sess });

        // PlaceId is added to user document
        user.places.push(createdPlace);
        await user.save({ session: sess });

        // Commiting the transaction
        sess.commitTransaction();

    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place creation failed'));
    }

    res.status(201).json({
        status: 'success',
        data: {
            place: createdPlace
        }
    });

};

const updatePlaceById = async (req, res, next) => {

    // Check if there are any validation errors from the array of 
    // validators we provided in the routes
    const errors = validator.validationResult(req);

    if (!errors.isEmpty())
        return next(new HttpError(422, 'Invalid inputs.'));

    const placeId = req.params.placeId;
    const { title, description } = req.body;

    let toBeUpdatedPlace;

    try {
        toBeUpdatedPlace = await Place.findByIdAndUpdate(placeId, { title, description }, { new: true });
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place updation failed'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            place: toBeUpdatedPlace
        }
    });

};

const deletePlaceById = async (req, res, next) => {

    const placeId = req.params.placeId;

    try {
        await Place.findByIdAndDelete(placeId);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place deletion failed'));
    }

    res.status(204).json({
        status: 'success',
        data: {
            place: null
        }
    });

};

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };