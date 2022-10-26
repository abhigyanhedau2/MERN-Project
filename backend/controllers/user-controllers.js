const HttpError = require('../utils/http-error');
const validator = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(new HttpError(500, 'User creation failed'));
    }

    const newUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    });

    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, 'User creation failed'));
    }

    let token;
    try {
        token = jwt.sign({ userId: newUser.id, email: newUser.email }, 'supersecret_dont_share', {
            expiresIn: '1h'
        });
    } catch (error) {
        return next(new HttpError(500, 'User creation failed'));
    }

    res.status(201).json({
        status: 'success',
        data: {
            userId: newUser.id,
            email: newUser.email,
            token
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

    if (!existingUser)
        return next(new HttpError(400, 'Invalid Credentials'));

    let passwordIsValid;

    try {
        passwordIsValid = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        return next(new HttpError(500, 'Internal Server Error'));
    }

    if (!passwordIsValid)
        return next(new HttpError(400, 'Invalid Credentials'));

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, 'supersecret_dont_share', {
            expiresIn: '1h'
        });
    } catch (error) {
        return next(new HttpError(500, 'Loggin In failed'));
    }

    res.status(201).json({
        status: 'success',
        data: {
            userId: existingUser.id,
            email: existingUser.email,
            token
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            userId: existingUser.id,
            email: existingUser.email,
            token
        }
    });

};

module.exports = { getUsers, signup, login };