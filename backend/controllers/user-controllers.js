const HttpError = require('../utils/http-error');
const validator = require('express-validator');

const User = require('../models/user');

const getUsers = async (req, res, next) => {

    // Don't send back the password
    let users;

    try {
        users = await User.find({}, '-password');
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Internal Server Error'));
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users.map(user => user.toObject({ getters: true }))
        }
    });

};

const signup = async (req, res, next) => {

    const errors = validator.validationResult(req);

    if (!errors.isEmpty())
        return next(new HttpError(400, 'Invalid Credentials'));

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Internal Server Error'));
    }

    if (existingUser)
        return next(new HttpError(400, 'User already exists.'));

    const newUser = new User({
        name,
        email,
        image: req.file.path,
        password,
        places: []
    });

    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'User creation failed'));
    }

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser.toObject({ getters: true })
        }
    });

};

const login = async (req, res, next) => {

    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'Internal Server Error'));
    }

    if (!existingUser || existingUser.password !== password)
        return next(new HttpError(400, 'Invalid Credentials'));

    res.status(200).json({
        status: 'success',
        data: {
            user: existingUser.toObject({ getters: true })
        }
    });

};

module.exports = { getUsers, signup, login };