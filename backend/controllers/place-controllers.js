const fs = require('fs');
const HttpError = require('../utils/http-error');
const validator = require('express-validator');
const mongoose = require('mongoose');

const Place = require('../models/place');
const User = require('../models/user');
const getCoordsForAddress = require('../utils/location');

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
        userPlaces = await User.findById(userId).populate('places');
    } catch (error) {
        return next(new HttpError(500, 'Places retrieval failed'));
    }

    if (!userPlaces || userPlaces.places.length === 0)
        return next(new HttpError(404, 'Could not find a place for the provided user id'));

    res.status(200).json({
        status: 'success',
        results: userPlaces.length,
        data: {
            userPlaces: userPlaces.places.map(place => place.toObject({ getters: true }))
        }
    });

};

const createPlace = async (req, res, next) => {

    // Check if there are any validation errors from the array of 
    // validators we provided in the routes
    const errors = validator.validationResult(req);

    if (!errors.isEmpty())
        return next(new HttpError(422, 'Invalid inputs.'));

    const { title, description, address } = req.body;

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
        image: req.file.path,
        address,
        creator: req.userData.userId
    });

    // Check if user id exists
    let user;

    try {
        user = await User.findById(req.userData.userId);
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
        toBeUpdatedPlace = await Place.findById(placeId);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place updation failed'));
    }

    if (toBeUpdatedPlace.creator.toString() !== req.userData.userId) {
        const error = new HttpError(422, 'You are not allowed to edit this place.');
        return next(error);
    }

    toBeUpdatedPlace.title = title;
    toBeUpdatedPlace.description = description;

    try {
        await toBeUpdatedPlace.save();
    } catch (err) {
        const error = new HttpError(500, 'Something went wrong, could not update place.');
        return next(error);
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

    let place;

    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place deletion failed'));
    }

    if (!place)
        return next(new HttpError(404, 'Place not found'));

    if (place.creator.id.toString() !== req.userData.userId) {
        const error = new HttpError(422, 'You are not allowed to delete this place.');
        return next(error);
    }

    const imagePath = place.image;

    try {

        const sess = await mongoose.startSession();

        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();

    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Place deletion failed'));
    }

    fs.unlink(imagePath, (err) => {
        console.log(err);
    })

    res.status(204).send({
        status: 'success'
    });

};

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };